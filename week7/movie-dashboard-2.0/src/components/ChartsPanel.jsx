import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function ChartsPanel({ genreChartData, ratingTrendData }) {
  return (
    <section className="chart-grid">
      <article className="chart-card">
        <h3>Genre Distribution</h3>
        <p>How many of the visible movies belong to each top genre.</p>
        <div className="chart-size">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genreChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Movies" fill="#136f63" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="chart-card">
        <h3>Rating Trend by Month</h3>
        <p>Average vote rating for each release month in the current result set.</p>
        <div className="chart-size">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ratingTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgRating"
                name="Avg Rating"
                stroke="#ff7b00"
                strokeWidth={3}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  )
}

export default ChartsPanel
