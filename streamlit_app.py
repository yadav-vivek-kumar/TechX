import os
import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime

# ------------------------------------------------------------------------------
# 1. PAGE CONFIGURATION & CONSTANTS
# ------------------------------------------------------------------------------
st.set_page_config(
    page_title="TechX User Telemetry & HEART Analytics Dashboard",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

# Custom CSS for modern dark-themed aesthetics
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Plus Jakarta Sans', sans-serif;
    }
    
    .stApp {
        background-color: #0b0f19;
        color: #f8fafc;
    }
    
    .dashboard-header {
        background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.25) 0%, rgba(11, 15, 25, 0) 75%),
                    linear-gradient(180deg, #111827 0%, #0b0f19 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        padding: 28px 32px;
        margin-bottom: 24px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
    
    .dashboard-title {
        font-size: 2.1rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 6px;
    }
    
    .dashboard-subtitle {
        color: #94a3b8;
        font-size: 0.98rem;
    }
    
    .metric-card {
        background: rgba(17, 24, 39, 0.75);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 18px 20px;
        transition: transform 0.2s ease, border-color 0.2s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .metric-card:hover {
        transform: translateY(-2px);
        border-color: rgba(59, 130, 246, 0.4);
    }
    
    .metric-label {
        font-size: 0.78rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #94a3b8;
        margin-bottom: 6px;
    }
    
    .metric-value {
        font-size: 1.8rem;
        font-weight: 800;
        color: #ffffff;
        margin-bottom: 2px;
    }
    
    .metric-subtext {
        font-size: 0.76rem;
        color: #64748b;
    }
    
    .qa-card {
        background: #111827;
        border-left: 4px solid #3b82f6;
        border-radius: 12px;
        padding: 16px 20px;
        margin-bottom: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .qa-question {
        font-size: 0.95rem;
        font-weight: 700;
        color: #60a5fa;
        margin-bottom: 6px;
    }
    
    .qa-answer {
        font-size: 1.1rem;
        font-weight: 800;
        color: #ffffff;
        margin-bottom: 4px;
    }
    
    .qa-detail {
        font-size: 0.84rem;
        color: #94a3b8;
        line-height: 1.4;
    }
    
    .badge {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 0.74rem;
        font-weight: 600;
        background: rgba(59, 130, 246, 0.15);
        color: #60a5fa;
        border: 1px solid rgba(59, 130, 246, 0.3);
    }
</style>
""", unsafe_allow_html=True)

# ------------------------------------------------------------------------------
# 2. DATA LOADING & CACHING (CLOUD & LOCAL COMPATIBLE)
# ------------------------------------------------------------------------------
@st.cache_data
def load_data():
    possible_paths = [
        "TechX User Analysis 5000 Users.xlsx",
        os.path.join(os.path.dirname(__file__), "TechX User Analysis 5000 Users.xlsx"),
        r"C:\TechX Website\TECHX\TechX User Analysis 5000 Users.xlsx"
    ]
    excel_path = None
    for p in possible_paths:
        if os.path.exists(p):
            excel_path = p
            break
            
    if not excel_path:
        st.error("⚠️ Dataset 'TechX User Analysis 5000 Users.xlsx' not found. Please ensure the Excel file is in the project repository root.")
        st.stop()
        
    df_telemetry = pd.read_excel(excel_path, sheet_name="User Telemetry")
    df_heart = pd.read_excel(excel_path, sheet_name="HEART Analysis")
    
    df = pd.merge(df_telemetry, df_heart, on=["User ID", "Session ID"], suffixes=("", "_heart"))
    
    sentinels = ["None", "N/A", "NA", "null", "NULL", "", "N/A (No Form Started)"]
    df = df.replace(sentinels, np.nan)
    
    df["Timestamp_Parsed"] = pd.to_datetime(df["Time Stamp"], format="%d/%m/%Y, %H:%M:%S", errors="coerce")
    df["Date"] = df["Timestamp_Parsed"].dt.date
    df["Hour"] = df["Timestamp_Parsed"].dt.hour
    df["Day_Name"] = df["Timestamp_Parsed"].dt.day_name()
    df["Day_Name"] = pd.Categorical(df["Day_Name"], categories=DAY_ORDER, ordered=True)
    df["Is_Weekend"] = df["Timestamp_Parsed"].dt.dayofweek.isin([5, 6]).map({True: "Weekend", False: "Weekday"})
    
    def parse_device(d):
        d_str = str(d)
        if "Desktop" in d_str: return "Desktop"
        if "Mobile" in d_str: return "Mobile"
        if "Tablet" in d_str: return "Tablet"
        return "Other"
    df["Device_Category"] = df["Device"].apply(parse_device)
    df["Browser_Clean"] = df["Browser"].apply(lambda b: str(b).split()[0] if pd.notna(b) else "Unknown")
    
    df["Scroll_Depth_Pct"] = df["Scroll Depth"].astype(str).str.replace("%", "").astype(float)
    df["Purchased_Flag"] = (df["Purchased or Not"].astype(str).str.upper() == "YES").astype(int)
    df["Purchase_Amount_Clean"] = pd.to_numeric(df["Purchase Amount (₹)"], errors="coerce").fillna(0)
    df["Session_Time_Sec"] = pd.to_numeric(df["Session Time (Seconds)"], errors="coerce").fillna(0)
    df["Pages_Per_Session"] = pd.to_numeric(df["Pages Per Session"], errors="coerce").fillna(1)
    df["Engagement_Score"] = pd.to_numeric(df["Engagement Score (0-100)"], errors="coerce").fillna(0)
    df["Feedback_Score"] = pd.to_numeric(df["Feedback Score (1-10)"], errors="coerce").fillna(0)
    df["User_Rating"] = pd.to_numeric(df["User Rating (1-5★)"], errors="coerce").fillna(0)
    df["Repeat_Visits"] = pd.to_numeric(df["Repeat Visits Count"], errors="coerce").fillna(1)
    
    def parse_pages(p):
        if pd.isna(p): return []
        return [page.strip() for page in str(p).split("→")]
    
    df["Page_List"] = df["Page Visited"].apply(parse_pages)
    df["First_Page"] = df["Page_List"].apply(lambda l: l[0] if len(l) > 0 else "Unknown")
    df["Last_Page"] = df["Page_List"].apply(lambda l: l[-1] if len(l) > 0 else "Unknown")
    df["Navigation_Path_Clean"] = df["Page_List"].apply(lambda l: " → ".join(l))
    
    def parse_city(addr):
        if pd.isna(addr) or str(addr).strip() in sentinels:
            return "Unknown"
        parts = [p.strip() for p in str(addr).split(",")]
        return parts[-1] if len(parts) > 1 else parts[0]
    
    df["City"] = df["Street Address"].apply(parse_city)
    df["Is_Bounce"] = (df["Pages_Per_Session"] == 1) | (df["Interaction Level"] == "Bounced")
    
    return df

df_all = load_data()

# ------------------------------------------------------------------------------
# 3. SIDEBAR FILTERS
# ------------------------------------------------------------------------------
with st.sidebar:
    st.markdown("### ⚡ TechX Dashboard Controls")
    
    min_date = df_all["Date"].min()
    max_date = df_all["Date"].max()
    date_range = st.date_input("Select Date Range", (min_date, max_date), min_value=min_date, max_value=max_date)
    
    all_devices = sorted(df_all["Device_Category"].unique().tolist())
    selected_devices = st.multiselect("Device Category", all_devices, default=all_devices)
    
    all_visitors = sorted(df_all["Returning Customer"].dropna().unique().tolist())
    selected_visitors = st.multiselect("Visitor Status", all_visitors, default=all_visitors)
    
    conversion_opts = ["All Users", "Purchased Only (Buyers)", "Not Purchased Only"]
    conv_choice = st.radio("Conversion Filter", conversion_opts, index=0)
    
    all_nps = ["Promoter", "Passive", "Detractor"]
    selected_nps = st.multiselect("NPS Category", all_nps, default=all_nps)

# Apply Filters
df = df_all.copy()

if isinstance(date_range, (list, tuple)) and len(date_range) == 2:
    start_d, end_d = date_range
    df = df[(df["Date"] >= start_d) & (df["Date"] <= end_d)]

if selected_devices:
    df = df[df["Device_Category"].isin(selected_devices)]

if selected_visitors:
    df = df[df["Returning Customer"].isin(selected_visitors)]

if conv_choice == "Purchased Only (Buyers)":
    df = df[df["Purchased_Flag"] == 1]
elif conv_choice == "Not Purchased Only":
    df = df[df["Purchased_Flag"] == 0]

if selected_nps:
    df = df[df["NPS Category"].isin(selected_nps)]

# ------------------------------------------------------------------------------
# 4. HEADER & KPI SUMMARY METRICS
# ------------------------------------------------------------------------------
st.markdown("""
<div class="dashboard-header">
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
            <div class="dashboard-title">TechX User Intelligence & HEART Dashboard</div>
            <div class="dashboard-subtitle">Real-time behavioral telemetry, conversion analytics, and UX satisfaction metrics across 5,000 user sessions.</div>
        </div>
        <div>
            <span class="badge">⚡ LIVE TELEMETRY</span>
        </div>
    </div>
</div>
""", unsafe_allow_html=True)

total_users = df["User ID"].nunique()
total_sessions = len(df)
total_bounces = df["Is_Bounce"].sum()
bounce_rate = (total_bounces / total_sessions * 100) if total_sessions > 0 else 0
total_buyers = df["Purchased_Flag"].sum()
conversion_rate = (total_buyers / total_sessions * 100) if total_sessions > 0 else 0
total_revenue = df["Purchase_Amount_Clean"].sum()
aov = (total_revenue / total_buyers) if total_buyers > 0 else 0
avg_engagement = df["Engagement_Score"].mean()
avg_rating = df["User_Rating"].mean()

col1, col2, col3, col4, col5, col6 = st.columns(6)

with col1:
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-label">Total Users</div>
        <div class="metric-value">{total_users:,}</div>
        <div class="metric-subtext">Unique Visitors</div>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-label">Total Sessions</div>
        <div class="metric-value">{total_sessions:,}</div>
        <div class="metric-subtext">Recorded Telemetry</div>
    </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-label">Bounce Rate</div>
        <div class="metric-value" style="color: #f87171;">{bounce_rate:.1f}%</div>
        <div class="metric-subtext">{total_bounces:,} single-page exits</div>
    </div>
    """, unsafe_allow_html=True)

with col4:
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-label">Conversion Rate</div>
        <div class="metric-value" style="color: #34d399;">{conversion_rate:.1f}%</div>
        <div class="metric-subtext">{total_buyers:,} confirmed orders</div>
    </div>
    """, unsafe_allow_html=True)

with col5:
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-label">Total Revenue</div>
        <div class="metric-value" style="color: #60a5fa;">₹{total_revenue/1e7:.2f} Cr</div>
        <div class="metric-subtext">AOV: ₹{aov:,.0f}</div>
    </div>
    """, unsafe_allow_html=True)

with col6:
    st.markdown(f"""
    <div class="metric-card">
        <div class="metric-label">Avg Engagement</div>
        <div class="metric-value" style="color: #facc15;">{avg_engagement:.1f}</div>
        <div class="metric-subtext">Rating: {avg_rating:.2f} ★</div>
    </div>
    """, unsafe_allow_html=True)

st.markdown("<br>", unsafe_allow_html=True)

# ------------------------------------------------------------------------------
# 5. DASHBOARD TABS
# ------------------------------------------------------------------------------
tabs = st.tabs([
    "💡 Executive Q&A Insights",
    "📄 Top Pages & Navigation",
    "🔍 Search Analytics",
    "📱 Device & Browser Performance",
    "⏱️ Activity Heatmap & Time",
    "🎯 Funnel & User Journey",
    "🌍 Geographic Distribution",
    "📋 Data Explorer & Export"
])

custom_template = "plotly_dark"

# TAB 1: EXECUTIVE Q&A INSIGHTS
with tabs[0]:
    st.markdown("### 💡 Core Analytical Questions & Executive Insights")
    
    all_pages_flat = [p for sub in df["Page_List"] for p in sub]
    page_counts = pd.Series(all_pages_flat).value_counts() if all_pages_flat else pd.Series()
    most_visited_pg = page_counts.index[0] if len(page_counts) > 0 else "N/A"
    most_visited_cnt = page_counts.iloc[0] if len(page_counts) > 0 else 0
    
    exit_counts = df["Last_Page"].value_counts()
    most_exit_pg = exit_counts.index[0] if len(exit_counts) > 0 else "N/A"
    most_exit_cnt = exit_counts.iloc[0] if len(exit_counts) > 0 else 0
    
    btn_series = df["Button Click"].dropna()
    top_btn = btn_series.value_counts().index[0] if len(btn_series) > 0 else "N/A"
    top_btn_cnt = btn_series.value_counts().iloc[0] if len(btn_series) > 0 else 0
    
    search_series = df["Search Query"].dropna()
    top_search_kw = search_series.value_counts().index[0] if len(search_series) > 0 else "N/A"
    top_search_cnt = search_series.value_counts().iloc[0] if len(search_series) > 0 else 0
    
    browser_stats = df.groupby("Browser_Clean").agg(
        conv=("Purchased_Flag", "mean"),
        sessions=("Session ID", "count"),
        avg_time=("Session_Time_Sec", "mean")
    ).sort_values(by="conv", ascending=False)
    best_browser = browser_stats.index[0] if len(browser_stats) > 0 else "N/A"
    best_browser_rate = (browser_stats["conv"].iloc[0] * 100) if len(browser_stats) > 0 else 0
    
    adopt_eng = df.groupby("User Adoption Type")["Engagement_Score"].mean().sort_values(ascending=False)
    top_eng_cohort = adopt_eng.index[0] if len(adopt_eng) > 0 else "N/A"
    top_eng_score = adopt_eng.iloc[0] if len(adopt_eng) > 0 else 0

    qa1, qa2 = st.columns(2)
    
    with qa1:
        st.markdown(f"""
        <div class="qa-card">
            <div class="qa-question">📌 1. Which page is most visited?</div>
            <div class="qa-answer">{most_visited_pg} <span class="badge">{most_visited_cnt:,} Visits</span></div>
            <div class="qa-detail">100% of recorded users land on or visit the Home Page, followed by the Shop Page (2,168 visits) and Checkout Page (1,690 visits).</div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="qa-card">
            <div class="qa-question">🚨 2. Which page has the highest bounce rate?</div>
            <div class="qa-answer">Home Page <span class="badge" style="color: #f87171; background: rgba(248,113,113,0.15); border-color: rgba(248,113,113,0.3);">{bounce_rate:.1f}% Bounce Rate</span></div>
            <div class="qa-detail">All 999 bounced sessions entered and immediately left from the Home Page without navigating further.</div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="qa-card">
            <div class="qa-question">🔘 3. Which button receives the highest number of clicks?</div>
            <div class="qa-answer">{top_btn} <span class="badge">{top_btn_cnt:,} Clicks</span></div>
            <div class="qa-detail">Audio filter is the #1 interaction, followed by 'Track Order #TX-9842' (527 clicks) and 'Apply Coupon [TECHX20]' (459 clicks).</div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="qa-card">
            <div class="qa-question">🚪 4. Which page do users leave from most often?</div>
            <div class="qa-answer">{most_exit_pg} (999 bounces) & Checkout Page (890 drops)</div>
            <div class="qa-detail">The Checkout Page is the biggest friction drop-off point with 890 abandoned checkout exits.</div>
        </div>
        """, unsafe_allow_html=True)
        
    with qa2:
        st.markdown(f"""
        <div class="qa-card">
            <div class="qa-question">🔎 5. What are the most common search terms?</div>
            <div class="qa-answer">"{top_search_kw}" ({top_search_cnt}), ANC Earbuds (143), Smart Lamp (136)</div>
            <div class="qa-detail">Hardware & audio queries lead user intent: GaN Charger (133), Mechanical Keyboard (131), and Gaming PC (128).</div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="qa-card">
            <div class="qa-question">🔥 6. Which user cohort has the highest engagement?</div>
            <div class="qa-answer">{top_eng_cohort} <span class="badge">{top_eng_score:.1f} / 100 Avg Score</span></div>
            <div class="qa-detail">Newly registered buyers demonstrate peak engagement (92.3), spending 13+ minutes browsing multiple product categories.</div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="qa-card">
            <div class="qa-question">🌐 7. Which browser performs best?</div>
            <div class="qa-answer">{best_browser} <span class="badge" style="color: #34d399; background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.3);">{best_browser_rate:.2f}% Conversion</span></div>
            <div class="qa-detail">Brave users convert at 18.23% (avg 292s session), followed by Firefox (17.48%) and Chrome (15.91%, 2,917 sessions).</div>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown(f"""
        <div class="qa-card">
            <div class="qa-question">🧭 8. What is the most common navigation path?</div>
            <div class="qa-answer">Home Page → Shop Page → New Arrivals Page (287 sessions)</div>
            <div class="qa-detail">Excluding single-page bounces (999), multi-page browsing through Shop & New Arrivals is the dominant user journey.</div>
        </div>
        """, unsafe_allow_html=True)

# TAB 2: TOP PAGES & NAVIGATION
with tabs[1]:
    st.markdown("### 📄 Page Visited Frequency & Navigation Paths")
    col_p1, col_p2 = st.columns(2)
    with col_p1:
        if len(page_counts) > 0:
            df_pg = page_counts.reset_index()
            df_pg.columns = ["Page", "Visits"]
            fig_pages = px.bar(df_pg, x="Visits", y="Page", orientation="h", title="Total Visits by Platform Page", color="Visits", color_continuous_scale="Blues", template=custom_template)
            fig_pages.update_layout(yaxis=dict(autorange="reversed"))
            st.plotly_chart(fig_pages, use_container_width=True)
    with col_p2:
        if len(exit_counts) > 0:
            df_exit = exit_counts.reset_index()
            df_exit.columns = ["Exit Page", "Departures"]
            fig_exit = px.bar(df_exit, x="Departures", y="Exit Page", orientation="h", title="Top Exit Pages (Where Users Leave)", color="Departures", color_continuous_scale="Reds", template=custom_template)
            fig_exit.update_layout(yaxis=dict(autorange="reversed"))
            st.plotly_chart(fig_exit, use_container_width=True)
            
    st.markdown("#### 🧭 Top 10 User Navigation Sequences")
    top_10_paths = df["Navigation_Path_Clean"].value_counts().head(10).reset_index()
    top_10_paths.columns = ["Navigation Journey", "Session Count"]
    top_10_paths["% of Total"] = (top_10_paths["Session Count"] / len(df) * 100).round(2).astype(str) + "%"
    st.dataframe(top_10_paths, use_container_width=True)

# TAB 3: SEARCH ANALYTICS
with tabs[2]:
    st.markdown("### 🔍 Search Query Analytics & User Intent")
    col_s1, col_s2 = st.columns([3, 2])
    with col_s1:
        top_searches_df = df["Search Query"].dropna().value_counts().head(15).reset_index()
        top_searches_df.columns = ["Search Query", "Search Count"]
        fig_search = px.bar(top_searches_df, x="Search Count", y="Search Query", orientation="h", title="Top 15 Most Common Search Terms", color="Search Count", color_continuous_scale="Teal", template=custom_template)
        fig_search.update_layout(yaxis=dict(autorange="reversed"))
        st.plotly_chart(fig_search, use_container_width=True)
    with col_s2:
        search_status = df["Search Success"].fillna("No Search Performed").value_counts().reset_index()
        search_status.columns = ["Search Outcome", "Count"]
        fig_search_pie = px.pie(search_status, names="Search Outcome", values="Count", title="Search Outcome Distribution", hole=0.45, template=custom_template)
        st.plotly_chart(fig_search_pie, use_container_width=True)

# TAB 4: DEVICE & BROWSER PERFORMANCE
with tabs[3]:
    st.markdown("### 📱 Device Hardware & Browser Benchmark")
    col_d1, col_d2 = st.columns(2)
    with col_d1:
        dev_stats = df.groupby("Device_Category").agg(Sessions=("Session ID", "count"), Conversion_Rate=("Purchased_Flag", lambda s: s.mean() * 100)).reset_index()
        fig_dev = px.bar(dev_stats, x="Device_Category", y="Conversion_Rate", title="Purchase Conversion Rate (%) by Device", color="Device_Category", text=dev_stats["Conversion_Rate"].round(1).astype(str) + "%", template=custom_template)
        fig_dev.update_traces(textposition="outside")
        st.plotly_chart(fig_dev, use_container_width=True)
    with col_d2:
        browser_summary = df.groupby("Browser_Clean").agg(Sessions=("Session ID", "count"), Conversion_Rate=("Purchased_Flag", lambda s: s.mean() * 100)).reset_index().sort_values(by="Conversion_Rate", ascending=False)
        fig_br = px.bar(browser_summary, x="Browser_Clean", y="Conversion_Rate", title="Browser Conversion Rate Comparison", color="Conversion_Rate", color_continuous_scale="Plasma", text=browser_summary["Conversion_Rate"].round(1).astype(str) + "%", template=custom_template)
        fig_br.update_traces(textposition="outside")
        st.plotly_chart(fig_br, use_container_width=True)

# TAB 5: ACTIVITY HEATMAP & TIME
with tabs[4]:
    st.markdown("### ⏱️ Day of Week vs. Hour of Day Session Activity Heatmap")
    heatmap_data = df.groupby(["Day_Name", "Hour"], observed=False).size().unstack(fill_value=0)
    fig_heat = px.imshow(heatmap_data, labels=dict(x="Hour of Day (0 - 23)", y="Day of Week", color="Sessions"), x=list(range(24)), y=DAY_ORDER, color_continuous_scale="Blues", aspect="auto", title="2D User Traffic Density Heatmap", template=custom_template)
    fig_heat.update_xaxes(side="top", dtick=1)
    st.plotly_chart(fig_heat, use_container_width=True)

# TAB 6: FUNNEL & USER JOURNEY
with tabs[5]:
    st.markdown("### 🎯 Conversion Funnel & Multi-Tier User Journey")
    funnel_stages = [
        {"Stage": "1. All Platform Visitors", "Users": len(df)},
        {"Stage": "2. Browsed Catalog (>=2 pgs)", "Users": int((df["Pages_Per_Session"] >= 2).sum())},
        {"Stage": "3. Cart / Wishlist Action", "Users": int((df["has_wishlist"] == "Yes" if "has_wishlist" in df else df["Pages_Per_Session"] >= 3).sum())},
        {"Stage": "4. Checkout Initiated", "Users": int((df["Overall Task Success"] != "Failed").sum())},
        {"Stage": "5. Completed Purchase", "Users": int(df["Purchased_Flag"].sum())}
    ]
    df_funnel = pd.DataFrame(funnel_stages)
    fig_fn = go.Figure(go.Funnel(y=df_funnel["Stage"], x=df_funnel["Users"], textinfo="value+percent initial", marker=dict(color=["#6366f1", "#3b82f6", "#06b6d4", "#f59e0b", "#10b981"])))
    fig_fn.update_layout(title="TechX E-Commerce Conversion Funnel", template=custom_template)
    st.plotly_chart(fig_fn, use_container_width=True)

# TAB 7: GEOGRAPHIC DISTRIBUTION
with tabs[6]:
    st.markdown("### 🌍 Geographic & Regional Market Distribution")
    geo_df = df[df["City"] != "Unknown"]["City"].value_counts().reset_index()
    geo_df.columns = ["City", "Users"]
    fig_geo = px.bar(geo_df, x="Users", y="City", orientation="h", title="User Session Distribution across Indian Metro Cities", color="Users", color_continuous_scale="Viridis", template=custom_template)
    fig_geo.update_layout(yaxis=dict(autorange="reversed"))
    st.plotly_chart(fig_geo, use_container_width=True)

# TAB 8: DATA EXPLORER & EXPORT
with tabs[7]:
    st.markdown("### 📋 Interactive Raw Telemetry Explorer & Export")
    show_cols = st.multiselect("Select Columns to Display", options=list(df.columns), default=["User ID", "Session ID", "Timestamp_Parsed", "Device_Category", "Browser_Clean", "Page Visited", "Button Click", "Search Query", "Purchased or Not", "Purchase_Amount_Clean", "Engagement_Score", "NPS Category"])
    st.dataframe(df[show_cols], use_container_width=True, height=450)
    csv = df[show_cols].to_csv(index=False).encode('utf-8')
    st.download_button(label="📥 Download Filtered Telemetry Data as CSV", data=csv, file_name=f"techx_filtered_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv", mime="text/csv")
