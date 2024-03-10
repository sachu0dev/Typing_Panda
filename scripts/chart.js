const { default: scoreAPI } = require("./scoreAPI");

(async () => {
  const lessons = scoreAPI.getChart();

  const labels = lessons.map((_, index) => `Lesson ${index + 1}`);

  const speeds = lessons.map(lesson => lesson.speed);
  const accuracy = lessons.map(lesson => lesson.accuracy);

  const ctx = document.getElementById('speedAccuracyChart').getContext('2d');
  const speedAccuracyChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Speed',
              data: speeds,
              borderColor: '#34febb', // Using --duo-1 color for speed line
              borderWidth: 2,
              fill: false,
              lineTension: 0.3,
              pointBackgroundColor: '#34febb', // Using --duo-1 color for speed points
              pointHoverRadius: 5,
              pointHoverBorderColor: '#34febb', // Using --duo-1 color for speed hover points
              pointHoverBorderWidth: 2
          },
          {
              label: 'Accuracy',
              data: accuracy,
              borderColor: '#5d8cc0', // Using --uno-3 color for accuracy line
              borderWidth: 2,
              fill: false,
              lineTension: 0.3,
              pointBackgroundColor: '#5d8cc0', // Using --uno-3 color for accuracy points
              pointHoverRadius: 5,
              pointHoverBorderColor: '#5d8cc0', // Using --uno-3 color for accuracy hover points
              pointHoverBorderWidth: 2
          }
          ]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Value',
                      color: '#d6e9ff' // Setting font color to #d6e9ff for the axis labels
                  },
                  grid: {
                      display: false
                  },
                  ticks: {
                      color: '#d6e9ff' // Setting font color to #d6e9ff for the axis labels
                  }
              },
              x: {
                  title: {
                      display: true,
                      text: 'Lessons',
                      color: '#d6e9ff' // Setting font color to #d6e9ff for the axis labels
                  },
                  grid: {
                      display: false
                  },
                  ticks: {
                      color: '#d6e9ff' // Setting font color to #d6e9ff for the axis labels
                  }
              }
          },
          plugins: {
              title: {
                  display: true,
                  text: 'Speed vs Accuracy Chart',
                  font: {
                      size: 14,
                      color: '#d6e9ff' // Setting font color to #d6e9ff for the chart title
                  }
              },
              legend: {
                  position: 'bottom'
              },
              tooltip: {
                  mode: 'index',
                  intersect: false,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  titleFont: {
                      size: 12
                  },
                  bodyFont: {
                      size: 12,
                      color: '#d6e9ff' // Setting body font color to #d6e9ff
                  },
                  titleSpacing: 4,
                  bodySpacing: 4,
                  callbacks: {
                      title: (tooltipItem) => { `Lesson ${tooltipItem[0].index + 1}` }
                  }
              }
          }
      }
  });
})();