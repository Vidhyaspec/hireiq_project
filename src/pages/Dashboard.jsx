import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "../styles/dashboard.css";
import API_URL from "../config";

export default function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    jobs: 0,
    applicants: 0,
    shortlisted: 0,
    avgScore: 0
  });

  const [chartData, setChartData] =
    useState([]);

  useEffect(() => {

    axios.get(
      `${API_URL}/dashboard_stats.php`
    )
    .then((res) => {

      const data = res.data;

      setStats(data);

      setChartData([
        {
          name: "Jobs",
          value: data.jobs
        },

        {
          name: "Applicants",
          value: data.applicants
        },

        {
          name: "Shortlisted",
          value: data.shortlisted
        }
      ]);

    });

  }, []);

  return (

    <div className="dashboard-page">

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* WELCOME */}
        <div className="welcome-box">

          <h1>
            Welcome Back 👋
          </h1>

          <p>
            {user?.name}
          </p>

          <p>
            Role: {user?.role}
          </p>

          <p>
  Manage hiring, applicants and AI analytics easily.
</p>

        </div>

        {/* STATS */}
        <div className="stats-grid">

          <div className="stat-card">

            <h2>
              {stats.jobs}
            </h2>

            <p>
              Total Jobs
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {stats.applicants}
            </h2>

            <p>
              Total Applicants
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {stats.shortlisted}
            </h2>

            <p>
              Shortlisted
            </p>

          </div>

          <div className="stat-card">

            <h2>
              {stats.avgScore}%
            </h2>

            <p>
              Average AI Score
            </p>

          </div>

        </div>

        {/* GRAPH */}
        <div className="graph-card">

          <h2>
            Hiring Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
  dataKey="value"
  radius={[10,10,0,0]}
  fill="#3b82f6"
/>

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}