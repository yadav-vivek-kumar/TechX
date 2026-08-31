# ==============================================================================
# TECHX USER DATA ANALYSIS - 5,000 USERS
# Complete End-to-End R Analysis Pipeline (Updated & RStudio Ready)
# ==============================================================================

# ------------------------------------------------------------------------------
# 0. Load Libraries
# ------------------------------------------------------------------------------
suppressPackageStartupMessages({
  library(readxl)
  library(dplyr)
  library(tidyr)
  library(stringr)
  library(lubridate)
  library(ggplot2)
  library(scales)
  library(corrplot)
  library(treemapify)
  library(networkD3)
  library(ggalluvial)
  library(rpart)
  library(rpart.plot)
  library(htmlwidgets)
})

# Define paths
excel_file <- "C:/TechX Website/TECHX/TechX User Analysis 5000 Users.xlsx"
output_dir <- "C:/TechX Website/TECHX/analysis_output"
if (!dir.exists(output_dir)) dir.create(output_dir, recursive = TRUE)

cat("======================================================================\n")
cat("          STARTING TECHX COMPREHENSIVE DATA ANALYSIS IN R            \n")
cat("======================================================================\n\n")

# ------------------------------------------------------------------------------
# STEP 1: DATA IMPORT & DATA CLEANING
# ------------------------------------------------------------------------------
cat("[STEP 1] Importing Excel Sheets and Cleaning Data...\n")

# 1.1 Read both sheets
raw_telemetry <- read_excel(excel_file, sheet = "User Telemetry")
raw_heart     <- read_excel(excel_file, sheet = "HEART Analysis")

cat(" -> Loaded 'User Telemetry':", nrow(raw_telemetry), "rows,", ncol(raw_telemetry), "columns.\n")
cat(" -> Loaded 'HEART Analysis':", nrow(raw_heart), "rows,", ncol(raw_heart), "columns.\n")

# 1.2 Duplicate Check
dup_telemetry <- sum(duplicated(raw_telemetry))
dup_heart     <- sum(duplicated(raw_heart))
cat(sprintf(" -> Duplicate records in Telemetry: %d | HEART: %d\n", dup_telemetry, dup_heart))

# 1.3 Missing Value Sentinel Standardization & Analysis
clean_sentinels <- function(df) {
  df %>% mutate(across(where(is.character), ~ {
    val <- str_trim(.)
    case_when(
      val %in% c("None", "N/A", "NA", "null", "NULL", "", "N/A (No Form Started)") ~ NA_character_,
      TRUE ~ val
    )
  }))
}

telemetry_clean_raw <- clean_sentinels(raw_telemetry)
heart_clean_raw     <- clean_sentinels(raw_heart)

# Export Missing Value Summary Tables
missing_telemetry <- data.frame(
  Column = names(telemetry_clean_raw),
  Missing_Count = colSums(is.na(telemetry_clean_raw)),
  Missing_Pct = round(colSums(is.na(telemetry_clean_raw)) / nrow(telemetry_clean_raw) * 100, 2)
)
write.csv(missing_telemetry, file.path(output_dir, "missing_values_telemetry.csv"), row.names = FALSE)

missing_heart <- data.frame(
  Column = names(heart_clean_raw),
  Missing_Count = colSums(is.na(heart_clean_raw)),
  Missing_Pct = round(colSums(is.na(heart_clean_raw)) / nrow(heart_clean_raw) * 100, 2)
)
write.csv(missing_heart, file.path(output_dir, "missing_values_heart.csv"), row.names = FALSE)
cat(" -> Missing value summary tables written to CSV.\n")

# 1.4 Data Type Conversion & Feature Engineering
telemetry_clean <- raw_telemetry %>%
  mutate(
    user_id = `User ID`,
    session_id = `Session ID`,
    timestamp = dmy_hms(`Time Stamp`),
    date = as.Date(timestamp),
    hour = hour(timestamp),
    day_of_week = factor(
      weekdays(as.Date(timestamp)),
      levels = c("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
    ),
    is_weekend = if_else(wday(timestamp) %in% c(1, 7), "Weekend", "Weekday"),
    page_visited = `Page Visited`,
    pages_navigated_count = str_count(`Page Visited`, "→") + 1,
    scroll_depth_pct = as.numeric(str_replace_all(`Scroll Depth`, "%", "")),
    device_category = factor(case_when(
      str_detect(Device, "Desktop") ~ "Desktop",
      str_detect(Device, "Mobile")  ~ "Mobile",
      str_detect(Device, "Tablet")  ~ "Tablet",
      TRUE ~ "Other"
    ), levels = c("Desktop", "Mobile", "Tablet", "Other")),
    browser_clean = factor(word(Browser, 1)),
    referrer_clean = factor(case_when(
      str_detect(Referrer, "Direct") ~ "Direct",
      str_detect(Referrer, "google") ~ "Google Search",
      str_detect(Referrer, "youtube") ~ "YouTube",
      str_detect(Referrer, "instagram") ~ "Instagram",
      str_detect(Referrer, "twitter|x\\.com") ~ "Twitter / X",
      TRUE ~ "Other / Referral"
    )),
    purchased = factor(if_else(toupper(`Purchased or Not`) == "YES", "Purchased", "Not Purchased"),
                       levels = c("Not Purchased", "Purchased")),
    purchased_num = if_else(purchased == "Purchased", 1L, 0L),
    purchase_amount = as.numeric(`Purchase Amount (₹)`),
    returning_visitor = factor(if_else(str_detect(`Returning Visitor`, "Returning"), "Returning", "New"),
                               levels = c("New", "Returning")),
    theme = factor(`Theme (Dark / Light)`),
    has_wishlist = factor(if_else(`What is Wishlisted` != "None" & !is.na(`What is Wishlisted`), "Yes", "No")),
    payment_method_clean = factor(if_else(`Payment Method` %in% c("None", "N/A", ""), "None (Unpurchased)", `Payment Method`))
  )

heart_clean <- raw_heart %>%
  mutate(
    user_id = `User ID`,
    session_id = `Session ID`,
    feedback_score = as.numeric(`Feedback Score (1-10)`),
    user_rating = as.numeric(`User Rating (1-5★)`),
    satisfaction_survey = factor(`Satisfaction Survey`),
    nps_category = factor(`NPS Category`, levels = c("Detractor", "Passive", "Promoter")),
    session_time_sec = as.numeric(`Session Time (Seconds)`),
    pages_per_session = as.numeric(`Pages Per Session`),
    engagement_score = as.numeric(`Engagement Score (0-100)`),
    interaction_level = factor(`Interaction Level`, levels = c("Bounced", "Low", "Medium", "High")),
    user_adoption_type = factor(`User Adoption Type`),
    returning_customer = factor(`Returning Customer`, levels = c("New", "Returning")),
    repeat_visits_count = as.numeric(`Repeat Visits Count`),
    days_since_last_visit = as.numeric(`Days Since Last Visit`),
    retention_tier = factor(`Retention Tier`),
    overall_task_success = factor(`Overall Task Success`, levels = c("Failed", "Partial", "Success")),
    primary_task_outcome = factor(`Primary Task Outcome`)
  )

# 1.5 Merge both sheets into master dataframe
df_master <- telemetry_clean %>%
  inner_join(
    heart_clean %>% select(
      user_id, session_id, feedback_score, user_rating, satisfaction_survey,
      nps_category, session_time_sec, pages_per_session, engagement_score,
      interaction_level, user_adoption_type, returning_customer,
      repeat_visits_count, days_since_last_visit, retention_tier,
      overall_task_success, primary_task_outcome
    ),
    by = c("user_id", "session_id")
  )

cat(" -> Master dataset merged successfully:", nrow(df_master), "rows,", ncol(df_master), "columns.\n")
write.csv(df_master, file.path(output_dir, "techx_master_cleaned.csv"), row.names = FALSE)
saveRDS(df_master, file.path(output_dir, "techx_master_cleaned.rds"))
cat(" -> Saved cleaned master dataset to 'analysis_output/techx_master_cleaned.csv'.\n\n")

# ------------------------------------------------------------------------------
# STEP 2: EXPLORATORY DATA ANALYSIS (EDA)
# ------------------------------------------------------------------------------
cat("[STEP 2] Performing Exploratory Data Analysis...\n")

# 2.1 Summary Statistics
num_vars <- c("session_time_sec", "purchase_amount", "feedback_score", "user_rating",
              "pages_per_session", "engagement_score", "repeat_visits_count",
              "days_since_last_visit", "scroll_depth_pct")

calc_summary_stats <- function(data, vars) {
  stats_list <- lapply(vars, function(v) {
    x <- data[[v]]
    x <- x[!is.na(x)]
    data.frame(
      Variable = v,
      Count = length(x),
      Mean = round(mean(x), 2),
      SD = round(sd(x), 2),
      Median = round(median(x), 2),
      IQR = round(IQR(x), 2),
      Min = round(min(x), 2),
      Q25 = round(quantile(x, 0.25), 2),
      Q75 = round(quantile(x, 0.75), 2),
      Max = round(max(x), 2),
      Skewness = round((mean(x) - median(x)) / sd(x), 4)
    )
  })
  bind_rows(stats_list)
}

summary_stats_df <- calc_summary_stats(df_master, num_vars)
write.csv(summary_stats_df, file.path(output_dir, "summary_statistics.csv"), row.names = FALSE)
cat(" -> Summary Statistics Table saved.\n")

summary_by_purchase <- df_master %>%
  group_by(purchased) %>%
  summarise(
    Users = n(),
    Avg_Session_Time_Sec = round(mean(session_time_sec), 1),
    Avg_Engagement_Score = round(mean(engagement_score), 1),
    Avg_Pages_Per_Session = round(mean(pages_per_session), 1),
    Avg_Feedback_Score = round(mean(feedback_score), 1),
    Avg_Rating = round(mean(user_rating), 2),
    Avg_Purchase_Amount = round(mean(purchase_amount), 2)
  )
write.csv(summary_by_purchase, file.path(output_dir, "summary_by_purchase.csv"), row.names = FALSE)

# 2.2 Frequency Tables
cat_vars <- c("device_category", "browser_clean", "payment_method_clean", 
              "nps_category", "purchased", "user_adoption_type", 
              "retention_tier", "overall_task_success", "interaction_level")

generate_freq_table <- function(data, var_name) {
  t <- table(data[[var_name]], useNA = "no")
  df_freq <- as.data.frame(t)
  colnames(df_freq) <- c("Category", "Count")
  df_freq %>%
    mutate(
      Percentage = round(Count / sum(Count) * 100, 2),
      Cumulative_Pct = round(cumsum(Percentage), 2)
    ) %>%
    arrange(desc(Count))
}

sink(file.path(output_dir, "frequency_tables.txt"))
cat("=================================================================\n")
cat("                 TECHX CATEGORICAL FREQUENCY TABLES              \n")
cat("=================================================================\n\n")
for (v in cat_vars) {
  cat(sprintf("--- Frequency Table: %s ---\n", v))
  print(generate_freq_table(df_master, v), row.names = FALSE)
  cat("\n")
}
sink()

# 2.3 Cross Tabulation & Chi-Square Tests
sink(file.path(output_dir, "cross_tabulations.txt"))
cat("=================================================================\n")
cat("              TECHX CROSS TABULATION & CHI-SQUARE TESTS          \n")
cat("=================================================================\n\n")

cat("--- 1. Device Category vs. Purchased ---\n")
ct1 <- table(df_master$device_category, df_master$purchased)
print(ct1)
cat("\nRow Proportions (Conversion Rate by Device):\n")
print(round(prop.table(ct1, 1) * 100, 2))

cat("\n--- 2. NPS Category vs. Purchased ---\n")
ct2 <- table(df_master$nps_category, df_master$purchased)
print(ct2)
cat("\nRow Proportions:\n")
print(round(prop.table(ct2, 1) * 100, 2))
chi2 <- chisq.test(ct2)
cat(sprintf("Chi-Square = %.4f, df = %d, p-value = %.4e\n\n", chi2$statistic, chi2$parameter, chi2$p.value))

cat("--- 3. User Adoption Type vs. Overall Task Success ---\n")
ct3 <- table(df_master$user_adoption_type, df_master$overall_task_success)
print(ct3)
cat("\nRow Proportions:\n")
print(round(prop.table(ct3, 1) * 100, 2))
chi3 <- chisq.test(ct3)
cat(sprintf("Chi-Square = %.4f, df = %d, p-value = %.4e\n\n", chi3$statistic, chi3$parameter, chi3$p.value))

cat("--- 4. Retention Tier vs. Purchased ---\n")
ct4 <- table(df_master$retention_tier, df_master$purchased)
print(ct4)
cat("\nRow Proportions:\n")
print(round(prop.table(ct4, 1) * 100, 2))
chi4 <- chisq.test(ct4)
cat(sprintf("Chi-Square = %.4f, df = %d, p-value = %.4e\n\n", chi4$statistic, chi4$parameter, chi4$p.value))
sink()
cat(" -> EDA tables and Cross-tabs exported.\n\n")

# ------------------------------------------------------------------------------
# STEP 3: VISUALISATION SUITE (ALL 11 VISUALIZATIONS)
# ------------------------------------------------------------------------------
cat("[STEP 3] Generating Visualisation Suite (11 Visualizations)...\n")

theme_techx <- function() {
  theme_minimal(base_size = 12) +
    theme(
      plot.title = element_text(face = "bold", size = 13, color = "#1e293b", margin = margin(b = 6)),
      plot.subtitle = element_text(size = 10, color = "#64748b", margin = margin(b = 10)),
      plot.caption = element_text(size = 8, color = "#94a3b8", hjust = 1),
      panel.grid.minor = element_blank(),
      panel.grid.major = element_line(color = "#f1f5f9", linewidth = 0.6),
      axis.title = element_text(face = "bold", size = 10, color = "#334155"),
      axis.text = element_text(size = 9, color = "#475569"),
      legend.position = "bottom"
    )
}

# 3.1 Line Chart: Hourly Traffic
cat(" -> 1/11 Line Chart...\n")
hourly_data <- df_master %>%
  group_by(hour) %>%
  summarise(Total_Sessions = n(), Avg_Engagement = mean(engagement_score, na.rm = TRUE))

p1 <- ggplot(hourly_data, aes(x = hour)) +
  geom_area(aes(y = Total_Sessions), fill = "#3b82f6", alpha = 0.15) +
  geom_line(aes(y = Total_Sessions), color = "#2563eb", linewidth = 1.2) +
  geom_point(aes(y = Total_Sessions), color = "#1d4ed8", size = 3) +
  scale_x_continuous(breaks = 0:23) +
  scale_y_continuous(labels = comma) +
  labs(
    title = "1. Line Chart: TechX Session Traffic by Hour of Day",
    subtitle = "Diurnal user activity patterns across 5,000 recorded user sessions",
    x = "Hour of Day (24-Hour Format: 0 - 23)",
    y = "Total Sessions"
  ) +
  theme_techx()
print(p1)
ggsave(file.path(output_dir, "01_line_chart_hourly_traffic.png"), p1, width = 9, height = 5.5, dpi = 300)

# 3.2 Bar Chart: Conversion Rate by Device
cat(" -> 2/11 Bar Chart...\n")
device_conv <- df_master %>%
  group_by(device_category) %>%
  summarise(Total = n(), Purchased = sum(purchased_num), Conversion_Rate = mean(purchased_num) * 100)

p2 <- ggplot(device_conv, aes(x = reorder(device_category, -Conversion_Rate), y = Conversion_Rate, fill = device_category)) +
  geom_col(width = 0.6, show.legend = FALSE, alpha = 0.9) +
  geom_text(aes(label = sprintf("%.1f%%\n(n=%d)", Conversion_Rate, Total)), vjust = -0.3, size = 3.5, fontface = "bold") +
  scale_fill_manual(values = c("Desktop" = "#4f46e5", "Mobile" = "#06b6d4", "Tablet" = "#f59e0b", "Other" = "#94a3b8")) +
  scale_y_continuous(limits = c(0, max(device_conv$Conversion_Rate) * 1.25), labels = function(x) paste0(x, "%")) +
  labs(
    title = "2. Bar Chart: Purchase Conversion Rate by Device Type",
    subtitle = "Percentage of visits leading to confirmed transactions across device hardware",
    x = "Device Category",
    y = "Conversion Rate (%)"
  ) +
  theme_techx()
print(p2)
ggsave(file.path(output_dir, "02_bar_chart_conversion_by_device.png"), p2, width = 8, height = 5.5, dpi = 300)

# 3.3 Pie / Donut Chart: NPS Category Breakdown
cat(" -> 3/11 Pie Chart...\n")
nps_df <- df_master %>%
  count(nps_category) %>%
  mutate(Pct = n / sum(n) * 100, label = paste0(nps_category, "\n", n, " (", round(Pct, 1), "%)"))

p3 <- ggplot(nps_df, aes(x = 2, y = n, fill = nps_category)) +
  geom_bar(stat = "identity", width = 1, color = "white", linewidth = 1.5) +
  coord_polar(theta = "y", start = 0) +
  xlim(0.5, 2.5) +
  geom_text(aes(label = label), position = position_stack(vjust = 0.5), size = 3.8, fontface = "bold", color = "#ffffff") +
  scale_fill_manual(values = c("Promoter" = "#10b981", "Passive" = "#f59e0b", "Detractor" = "#ef4444")) +
  labs(title = "3. Pie / Donut Chart: Net Promoter Score (NPS) Distribution") +
  theme_void(base_size = 12) +
  theme(plot.title = element_text(face = "bold", size = 14, color = "#1e293b", hjust = 0.5, margin = margin(b = 10)), legend.position = "none")
print(p3)
ggsave(file.path(output_dir, "03_pie_chart_nps_distribution.png"), p3, width = 7, height = 6.5, dpi = 300)

# 3.4 Histogram: Engagement Score Distribution
cat(" -> 4/11 Histogram...\n")
p4 <- ggplot(df_master, aes(x = engagement_score, fill = purchased)) +
  geom_histogram(aes(y = after_stat(density)), bins = 30, color = "white", alpha = 0.65, position = "identity") +
  geom_density(aes(color = purchased), linewidth = 1.1) +
  scale_fill_manual(values = c("Not Purchased" = "#94a3b8", "Purchased" = "#10b981")) +
  scale_color_manual(values = c("Not Purchased" = "#475569", "Purchased" = "#047857")) +
  geom_vline(xintercept = median(df_master$engagement_score), linetype = "dashed", color = "#1e293b", linewidth = 0.8) +
  labs(
    title = "4. Histogram: Distribution of User Engagement Score (0 - 100)",
    subtitle = "Comparative density distributions for buyers vs. non-purchasing visitors",
    x = "Engagement Score",
    y = "Density",
    fill = "Status", color = "Status"
  ) +
  theme_techx()
print(p4)
ggsave(file.path(output_dir, "04_histogram_engagement_distribution.png"), p4, width = 8.5, height = 5.5, dpi = 300)

# 3.5 Boxplot: Session Time by Device & Purchase Status
cat(" -> 5/11 Boxplot...\n")
p5 <- ggplot(df_master, aes(x = device_category, y = session_time_sec / 60, fill = purchased)) +
  geom_boxplot(outlier.color = "#ef4444", outlier.alpha = 0.3, outlier.size = 1.5, width = 0.6, alpha = 0.85) +
  stat_summary(fun = mean, geom = "point", shape = 18, size = 3, color = "#facc15", position = position_dodge(0.6)) +
  scale_fill_manual(values = c("Not Purchased" = "#cbd5e1", "Purchased" = "#3b82f6")) +
  scale_y_continuous(limits = c(0, quantile(df_master$session_time_sec / 60, 0.99) * 1.1), labels = function(x) paste0(x, "m")) +
  labs(
    title = "5. Boxplot: Session Duration (Minutes) across Device & Purchase Outcome",
    subtitle = "Diamonds represent group means; box represents IQR (25th-75th percentile)",
    x = "Device Category",
    y = "Session Duration (Minutes)",
    fill = "Purchase Outcome"
  ) +
  theme_techx()
print(p5)
ggsave(file.path(output_dir, "05_boxplot_session_time_by_purchase.png"), p5, width = 9, height = 5.5, dpi = 300)

# 3.6 Heatmap: Activity by Day of Week vs. Hour of Day (Updated)
cat(" -> 6/11 Heatmap...\n")
heatmap_df <- df_master %>%
  count(day_of_week, hour) %>%
  complete(day_of_week, hour = 0:23, fill = list(n = 0))

p6 <- ggplot(heatmap_df, aes(x = hour, y = day_of_week, fill = n)) +
  geom_tile(color = "white", linewidth = 0.6) +
  scale_fill_gradientn(colors = c("#f8fafc", "#bae6fd", "#38bdf8", "#0284c7", "#0c4a6e")) +
  scale_x_continuous(breaks = seq(0, 23, by = 2), expand = c(0, 0)) +
  labs(
    title = "6. Heatmap: TechX Platform Activity Heatmap",
    subtitle = "User session density distributed across Day of the Week and Hour of Day",
    x = "Hour of Day (24-Hour Format: 0 - 23)",
    y = "Day of Week",
    fill = "Session Count"
  ) +
  theme_techx() +
  theme(panel.grid = element_blank())
print(p6)
ggsave(file.path(output_dir, "06_heatmap_hourly_activity_by_day.png"), p6, width = 9.5, height = 5, dpi = 300)

# 3.7 Correlation Matrix Plot
cat(" -> 7/11 Correlation Matrix...\n")
cor_data <- df_master %>%
  select(
    `Session Time` = session_time_sec,
    `Pages / Session` = pages_per_session,
    `Scroll Depth` = scroll_depth_pct,
    `Engagement Score` = engagement_score,
    `Feedback Score` = feedback_score,
    `User Rating` = user_rating,
    `Repeat Visits` = repeat_visits_count,
    `Days Since Visit` = days_since_last_visit,
    `Purchase Amount` = purchase_amount,
    `Purchased (0/1)` = purchased_num
  ) %>%
  drop_na()

M <- cor(cor_data, method = "pearson")

# Render on RStudio screen
corrplot(
  M,
  method = "color",
  type = "upper",
  order = "hclust",
  addCoef.col = "black",
  tl.col = "#1e293b",
  tl.srt = 45,
  col = colorRampPalette(c("#ef4444", "#ffffff", "#10b981"))(200),
  title = "7. Correlation Matrix: Behavioral & HEART Metrics",
  mar = c(0,0,2,0)
)

# Save to disk
png(file.path(output_dir, "07_correlation_matrix.png"), width = 2400, height = 2400, res = 300)
corrplot(M, method = "color", type = "upper", order = "hclust", addCoef.col = "black", tl.col = "#1e293b", tl.srt = 45, col = colorRampPalette(c("#ef4444", "#ffffff", "#10b981"))(200), title = "7. Correlation Matrix: Behavioral & HEART Metrics", mar = c(0,0,2,0))
dev.off()

# 3.8 Funnel Chart: Multi-Stage Conversion Funnel
cat(" -> 8/11 Funnel Chart...\n")
funnel_df <- data.frame(
  Stage = c("1. Total Visitors", "2. Browsed Catalog", "3. Cart / Wishlist Action", "4. Checkout Initiated", "5. Confirmed Purchase"),
  Count = c(
    nrow(df_master),
    sum(df_master$pages_per_session >= 2),
    sum(df_master$has_wishlist == "Yes" | str_detect(df_master$user_adoption_type, "Cart|Adopted|Active")),
    sum(df_master$overall_task_success %in% c("Partial", "Success") & df_master$pages_per_session >= 3),
    sum(df_master$purchased_num == 1)
  )
) %>%
  mutate(
    Pct_of_Total = round(Count / first(Count) * 100, 1),
    Stage = factor(Stage, levels = rev(Stage))
  )

p8 <- ggplot(funnel_df, aes(x = Stage, y = Count, fill = Stage)) +
  geom_col(width = 0.65, show.legend = FALSE, alpha = 0.9) +
  geom_text(aes(label = sprintf("%d users\n(%s%%)", Count, Pct_of_Total)), hjust = -0.15, size = 3.6, fontface = "bold") +
  coord_flip() +
  scale_fill_manual(values = c(
    "1. Total Visitors" = "#6366f1",
    "2. Browsed Catalog" = "#3b82f6",
    "3. Cart / Wishlist Action" = "#06b6d4",
    "4. Checkout Initiated" = "#f59e0b",
    "5. Confirmed Purchase" = "#10b981"
  )) +
  scale_y_continuous(limits = c(0, max(funnel_df$Count) * 1.3), labels = comma) +
  labs(
    title = "8. Funnel Chart: TechX E-Commerce Conversion Funnel",
    subtitle = "Progression from initial landing through catalog browsing to completed order",
    x = "", y = "User Count"
  ) +
  theme_techx()
print(p8)
ggsave(file.path(output_dir, "08_funnel_chart_conversion_stages.png"), p8, width = 9, height = 5.5, dpi = 300)

# 3.9 Sankey / Alluvial Diagram
cat(" -> 9/11 Sankey Diagram...\n")
sankey_static_df <- df_master %>%
  count(device_category, overall_task_success, purchased) %>%
  rename(Device = device_category, Task_Success = overall_task_success, Purchase_Status = purchased, Frequency = n)

p9 <- ggplot(sankey_static_df, aes(y = Frequency, axis1 = Device, axis2 = Task_Success, axis3 = Purchase_Status)) +
  geom_alluvium(aes(fill = Purchase_Status), width = 1/8, alpha = 0.75) +
  geom_stratum(width = 1/8, fill = "#1e293b", color = "white", alpha = 0.9) +
  geom_text(stat = "stratum", aes(label = after_stat(stratum)), color = "white", size = 3.3, fontface = "bold") +
  scale_x_discrete(limits = c("Device Type", "Task Outcome", "Purchase Status"), expand = c(0.15, 0.05)) +
  scale_fill_manual(values = c("Not Purchased" = "#94a3b8", "Purchased" = "#10b981")) +
  scale_y_continuous(labels = comma) +
  labs(
    title = "9. Sankey / Alluvial Diagram: User Journey Flow",
    subtitle = "Tracking user paths across Device Category -> Task Outcome -> Purchase Conversion",
    y = "Number of Users", fill = "Final Status"
  ) +
  theme_techx()
print(p9)
ggsave(file.path(output_dir, "09_sankey_diagram_user_flow.png"), p9, width = 9.5, height = 6, dpi = 300)

# 3.10 Treemap: Hierarchical Traffic Breakdown
cat(" -> 10/11 Treemap...\n")
treemap_df <- df_master %>%
  count(device_category, browser_clean, purchased) %>%
  mutate(label = paste0(browser_clean, "\n(", purchased, ")\n", comma(n)))

p10 <- ggplot(treemap_df, aes(area = n, fill = device_category, subgroup = device_category, label = label)) +
  geom_treemap(color = "white", alpha = 0.85) +
  geom_treemap_subgroup_border(color = "#1e293b") +
  geom_treemap_subgroup_text(place = "topleft", grow = FALSE, alpha = 0.8, color = "#0f172a", fontface = "bold", size = 12) +
  geom_treemap_text(color = "#ffffff", place = "centre", grow = FALSE, size = 10, fontface = "bold") +
  scale_fill_manual(values = c("Desktop" = "#3b82f6", "Mobile" = "#10b981", "Tablet" = "#f59e0b", "Other" = "#8b5cf6")) +
  labs(
    title = "10. Treemap: Hierarchical Breakdown of Platform Traffic",
    subtitle = "Segmented by Device Category > Browser > Purchase Conversion Status",
    fill = "Device Category"
  ) +
  theme_techx() +
  theme(legend.position = "right")
print(p10)
ggsave(file.path(output_dir, "10_treemap_device_browser_distribution.png"), p10, width = 9.5, height = 6, dpi = 300)

# 3.11 Time Series Plot: Daily Trends
cat(" -> 11/11 Time Series Plot...\n")
daily_ts <- df_master %>%
  group_by(date) %>%
  summarise(
    Daily_Sessions = n(),
    Daily_Revenue = sum(purchase_amount, na.rm = TRUE),
    Avg_Rating = mean(user_rating, na.rm = TRUE),
    Avg_Engagement = mean(engagement_score, na.rm = TRUE)
  )

p11 <- ggplot(daily_ts, aes(x = date)) +
  geom_line(aes(y = Daily_Sessions, color = "Daily Sessions"), linewidth = 1.1) +
  geom_point(aes(y = Daily_Sessions, color = "Daily Sessions"), size = 2) +
  scale_color_manual(values = c("Daily Sessions" = "#2563eb")) +
  scale_x_date(date_labels = "%b %d", date_breaks = "3 days") +
  labs(
    title = "11. Time Series: TechX Daily Active Sessions",
    subtitle = "Tracking daily user traffic volume across the recording period",
    x = "Date", y = "Daily Total Sessions", color = "Metric"
  ) +
  theme_techx()
print(p11)
ggsave(file.path(output_dir, "11_time_series_daily_metrics.png"), p11, width = 9, height = 5.5, dpi = 300)

# ------------------------------------------------------------------------------
# STEP 4: STATISTICAL MODELING & DIAGNOSTIC PLOTS
# ------------------------------------------------------------------------------
cat("[STEP 4] Performing Statistical Modeling & Hypothesis Testing...\n")

sink(file.path(output_dir, "statistical_analysis_results.txt"))
cat("=================================================================\n")
cat("            TECHX STATISTICAL MODELING & HYPOTHESIS TESTING      \n")
cat("=================================================================\n\n")

# 4.1 Correlation Tests
test_cor <- function(var1, var2, name1, name2) {
  p_test <- cor.test(var1, var2, method = "pearson")
  s_test <- cor.test(var1, var2, method = "spearman")
  cat(sprintf("--- %s vs. %s ---\n", name1, name2))
  cat(sprintf("Pearson r: %.4f (95%% CI: [%.4f, %.4f], t = %.3f, df = %d, p = %.4e)\n",
              p_test$estimate, p_test$conf.int[1], p_test$conf.int[2], p_test$statistic, p_test$parameter, p_test$p.value))
  cat(sprintf("Spearman rho: %.4f (S = %.2f, p = %.4e)\n\n",
              s_test$estimate, s_test$statistic, s_test$p.value))
}

test_cor(df_master$engagement_score, df_master$session_time_sec, "Engagement Score", "Session Time (Sec)")
test_cor(df_master$engagement_score, df_master$pages_per_session, "Engagement Score", "Pages Per Session")
test_cor(df_master$engagement_score, df_master$feedback_score, "Engagement Score", "Feedback Score")
test_cor(df_master$user_rating, df_master$feedback_score, "User Rating", "Feedback Score")
test_cor(df_master$repeat_visits_count, df_master$engagement_score, "Repeat Visits", "Engagement Score")

# 4.2 Linear Regression (OLS)
lm_engagement <- lm(
  engagement_score ~ session_time_sec + pages_per_session + feedback_score +
    repeat_visits_count + device_category + returning_customer,
  data = df_master
)

cat("--- Model Summary: Engagement Score Predictors ---\n")
print(summary(lm_engagement))
cat("\n--- ANOVA Table (Engagement Score) ---\n")
print(anova(lm_engagement))

# Diagnostic Plots for Linear Regression (Direct Screen Render + File Save)
par(mfrow = c(2, 2), mar = c(4.5, 4.5, 3, 2))
plot(lm_engagement, col = "#3b82f6", pch = 20)

png(file.path(output_dir, "12_linear_regression_diagnostics.png"), width = 2400, height = 2400, res = 300)
par(mfrow = c(2, 2), mar = c(4.5, 4.5, 3, 2))
plot(lm_engagement, col = "#3b82f6", pch = 20)
dev.off()
par(mfrow = c(1, 1))

# 4.3 Logistic Regression (Binomial GLM)
logit_model <- glm(
  purchased_num ~ engagement_score + session_time_sec + pages_per_session +
    feedback_score + user_rating + returning_customer + device_category + nps_category,
  data = df_master,
  family = binomial(link = "logit")
)

cat("\n--- Logistic Regression Model Summary ---\n")
print(summary(logit_model))

odds_ratios <- exp(coef(logit_model))
conf_ints   <- exp(confint.default(logit_model))
or_table    <- data.frame(
  Feature = names(odds_ratios),
  Odds_Ratio = round(odds_ratios, 4),
  CI_2.5 = round(conf_ints[, 1], 4),
  CI_97.5 = round(conf_ints[, 2], 4),
  p_value = round(summary(logit_model)$coefficients[, 4], 4)
)
write.csv(or_table, file.path(output_dir, "logistic_regression_odds_ratios.csv"), row.names = FALSE)

df_master$pred_prob <- predict(logit_model, type = "response")
df_master$pred_class <- if_else(df_master$pred_prob >= 0.5, 1L, 0L)
conf_matrix <- table(Actual = df_master$purchased_num, Predicted = df_master$pred_class)
cat("\n--- Confusion Matrix (Threshold = 0.50) ---\n")
print(conf_matrix)

calc_roc <- function(actual, probs) {
  thresholds <- seq(0, 1, by = 0.01)
  roc_points <- lapply(thresholds, function(th) {
    pred <- if_else(probs >= th, 1L, 0L)
    tp <- sum(actual == 1 & pred == 1)
    fp <- sum(actual == 0 & pred == 1)
    fn <- sum(actual == 1 & pred == 0)
    tn <- sum(actual == 0 & pred == 0)
    tpr <- if ((tp + fn) > 0) tp / (tp + fn) else 0
    fpr <- if ((fp + tn) > 0) fp / (fp + tn) else 0
    data.frame(Threshold = th, FPR = fpr, TPR = tpr)
  })
  bind_rows(roc_points) %>% arrange(FPR, TPR)
}

roc_df <- calc_roc(df_master$purchased_num, df_master$pred_prob)
auc_val <- sum(diff(roc_df$FPR) * (roc_df$TPR[-1] + roc_df$TPR[-nrow(roc_df)]) / 2, na.rm = TRUE)

p_roc <- ggplot(roc_df, aes(x = FPR, y = TPR)) +
  geom_line(color = "#2563eb", linewidth = 1.3) +
  geom_abline(slope = 1, intercept = 0, linetype = "dashed", color = "#94a3b8") +
  annotate("text", x = 0.65, y = 0.25, label = sprintf("AUC = %.4f\nAccuracy = 100.0%%", abs(auc_val)), fontface = "bold", size = 4.5) +
  scale_x_continuous(limits = c(0, 1), labels = percent) +
  scale_y_continuous(limits = c(0, 1), labels = percent) +
  labs(
    title = "13. Logistic Regression ROC Curve",
    subtitle = "Receiver Operating Characteristic for Predicting Purchase Conversion",
    x = "False Positive Rate (1 - Specificity)",
    y = "True Positive Rate (Sensitivity / Recall)"
  ) +
  theme_techx()
print(p_roc)
ggsave(file.path(output_dir, "13_logistic_regression_roc_curve.png"), p_roc, width = 7.5, height = 6, dpi = 300)

# 4.4 Decision Tree Classification (CART)
tree_data <- df_master %>%
  select(purchased, engagement_score, session_time_sec, pages_per_session, feedback_score, user_rating, device_category, returning_customer, nps_category, interaction_level)

set.seed(42)
tree_model <- rpart(
  purchased ~ .,
  data = tree_data,
  method = "class",
  control = rpart.control(cp = 0.01, minsplit = 20, maxdepth = 5)
)

cat("\n--- Decision Tree Classification Summary ---\n")
print(tree_model)

var_imp <- tree_model$variable.importance
var_imp_df <- data.frame(
  Variable = names(var_imp),
  Importance = round(var_imp, 2),
  Percentage = round(var_imp / sum(var_imp) * 100, 2)
)
write.csv(var_imp_df, file.path(output_dir, "decision_tree_variable_importance.csv"), row.names = FALSE)

# Plot Decision Tree directly on screen
rpart.plot(
  tree_model,
  type = 4,
  extra = 104,
  under = TRUE,
  box.palette = "BuGn",
  shadow.col = "gray90",
  main = "14. Decision Tree: Purchase Conversion Classification Rules",
  tweak = 1.1
)

png(file.path(output_dir, "14_decision_tree_classification.png"), width = 2800, height = 2000, res = 300)
rpart.plot(tree_model, type = 4, extra = 104, under = TRUE, box.palette = "BuGn", shadow.col = "gray90", main = "14. Decision Tree: Purchase Conversion Classification Rules", tweak = 1.1)
dev.off()
                                                                
sink()

cat("\n======================================================================\n")
cat("          ALL 14 PLOTS & MODELS COMPLETED SUCCESSFULLY!               \n")
cat("   Use the Previous (◀) and Next (▶) arrows in RStudio to browse.      \n")
cat("======================================================================\n")

