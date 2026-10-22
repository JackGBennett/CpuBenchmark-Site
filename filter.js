let allData = [];
let chart = null;

Papa.parse('Benchmark.csv', {
    download: true, 
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        allData = results.data;

        populateFilter();

        drawPage(allData);

        document
            .getElementById('typeFilter')
            .addEventListener('change', filterData);
    }
});

function populateFilter() {

    const filter =
        document.getElementById('typeFilter');

    filter.innerHTML = '';

    filter.add(new Option('All Types', 'All'));

    const values =
        [...new Set(allData.map(row => row.socket))]
        .sort();

    values.forEach(value => {

        filter.add(
            new Option(value, value)
        );

    });
}

function filterData() {

    const selected =
        document.getElementById('typeFilter').value;

    let filteredData;

    if (selected === 'All') {

        filteredData = allData;

    } else {

        filteredData = allData.filter(
            row => row.Type === selected
        );

    }

    drawPage(filteredData);
}

function drawPage(data) {

    // Sort by payout (highest first)

    data.sort((a, b) =>
        Number(b.cpuName) -
        Number(a.cpuName)
    );

    const tbody =
        document.querySelector('#dataTable tbody');

    tbody.innerHTML = '';

    const labels = [];
    const values = [];

    data.forEach(row => {

        // Build table row

        const tr =
            document.createElement('tr');

      tr.innerHTML = `
        <td>${row.cpuName}</td>
        <td>${row.cpuMark}</td>
        <td>${row.threadMark}</td>
        <td>${row.TDP}</td>
        <td>${row.cores}</td>
		<td>${row.socket}</td>
      `;

        tbody.appendChild(tr);

        // Build chart arrays

        labels.push(row.Platform);

        values.push(
            Number(row.cpuMark)
        );

    });

    // Destroy old chart if one exists

    if (chart) {
        chart.destroy();
    }

    // Create chart

    chart = new Chart(
        document.getElementById('BenchmarkChart'),
        {
            type: 'bar',

            data: {
                labels: labels,

                datasets: [{
                    label: 'CPU Mark Score',
                    data: values,
                    backgroundColor: '#4e79a7'
                }]
            },

            options: {
                responsive: true,

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}
