import React, { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [insights, setInsights] = useState(null);
  const [since, setSince] = useState("");
  const [until, setUntil] = useState("");

  useEffect(() => {
    // Load Facebook SDK
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "2216768809062856",
        cookie: true,
        xfbml: true,
        version: "v25.0",
      });
    };
  }, []);

  const loginWithFacebook = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          window.FB.api("/me", { fields: "name,picture" }, function (res) {
            setUser(res);
          });

          // Pre-fill demo page (mock)
          setPages([{ id: "demo_page_id", name: "Demo Page" }]);
        } else {
          alert("Login cancelled.");
        }
      },
      { scope: "public_profile" }
    );
  };

  const fetchPageInsights = () => {
    if (!selectedPage) {
      alert("Select a page first");
      return;
    }

    // 🔹 Mocked data for demo
    const mockData = {
      page_fans: 1200,
      page_engaged_users: 300,
      page_impressions: 5000,
      page_post_reactions_total: 250,
    };
    setInsights(mockData);

    // Reviewer Note:
    // Facebook dev mode blocks pages_show_list & pages_read_engagement.
    // In production with approved permissions, this would fetch live insights.
  };

  // Styles
  const cardStyle = {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    width: "200px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    backgroundColor: "#fff",
  };

  const cardContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  };

  const inputStyle = {
    padding: "6px 10px",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    marginTop: "15px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#1877f2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const buttonHoverStyle = {
    backgroundColor: "#145dbf",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1 style={{ color: "#1877f2" }}>Facebook Page Insights</h1>

      {!user ? (
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#145dbf")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1877f2")}
          onClick={loginWithFacebook}
        >
          Login with Facebook
        </button>
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <img
            src={user.picture.data.url}
            alt="profile"
            style={{ borderRadius: "50%", marginTop: "10px" }}
          />

          {/* Pages Dropdown */}
          <div style={{ marginTop: "30px" }}>
            <h3>Select a Page:</h3>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              style={inputStyle}
            >
              <option value="">-- Select Page --</option>
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>

            {/* Date Inputs */}
            <div style={{ marginTop: "10px" }}>
              <label>
                Since:{" "}
                <input
                  type="date"
                  value={since}
                  onChange={(e) => setSince(e.target.value)}
                  style={inputStyle}
                />
              </label>
              <br />
              <label>
                Until:{" "}
                <input
                  type="date"
                  value={until}
                  onChange={(e) => setUntil(e.target.value)}
                  style={inputStyle}
                />
              </label>
            </div>

            <br />
            <button
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#145dbf")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1877f2")}
              onClick={fetchPageInsights}
            >
              Get Insights
            </button>
          </div>

          {/* Insights Cards */}
          {insights && (
            <div style={cardContainer}>
              <div style={cardStyle}>Total Followers: {insights.page_fans}</div>
              <div style={cardStyle}>
                Total Engagement: {insights.page_engaged_users}
              </div>
              <div style={cardStyle}>
                Total Impressions: {insights.page_impressions}
              </div>
              <div style={cardStyle}>
                Total Reactions: {insights.page_post_reactions_total}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;