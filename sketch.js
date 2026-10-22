Papa.parse('Benchmark.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    console.log("running");
    console.log(results.data);
    const tbody = document.querySelector('#dataTable tbody');
 
    results.data.forEach(row => {
 
      const tr = document.createElement('tr');
 
      tr.innerHTML = `
        <td>${row.cpuName}</td>
        <td>${row.cpuMark}</td>
        <td>${row.threadMark}</td>
        <td>${row.TDP}</td>
        <td>${row.cores}</td>
		<td>${row.socket}</td>
      `;
 
      tbody.appendChild(tr); 
    });
  },
 
  error: function(err) {
    console.error("FAILED");
    console.error(err);
  }
});