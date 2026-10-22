Papa.parse('Benchmark.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
 
  complete: function(results) {
 
    const labels = [];
    const values = [];
 
    results.data.forEach(row => {
      labels.push(row.cpuName);
      values.push(cleanNumber(row.cpuMark));
    });
 
    new Chart(
      document.getElementById('CPUMarkChart'),
      {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'CPU',
            data: values,
            backgroundColor: '#4e79a7'
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'MarkScore'
              }
            }
          }
        }
      }
    );
  }
});
function cleanNumber(value) {
  return Number(
    String(value).replace(/[^0-9.-]/g, '')
  );
}