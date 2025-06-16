// Dashboard JavaScript for Power BI Clone
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initializeDashboard();
    initializeCharts();
    initializeFilters();
    initializeModal();
    initializeWorkspace();
    initializeSearch();
    initializeDataTable();
});

// Global variables for charts
let charts = {};
let currentData = generateSampleData();

// Initialize dashboard
function initializeDashboard() {
    // Auto-refresh functionality
    setInterval(updateDashboardData, 30000); // Update every 30 seconds
    
    // Refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg)';
            this.style.transition = 'transform 0.5s ease';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 500);
            
            updateDashboardData();
        });
    }
    
    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportDashboard);
    }
}

// Initialize all charts
function initializeCharts() {
    initializeKPISparklines();
    initializeMainCharts();
}

// Initialize KPI sparkline charts
function initializeKPISparklines() {
    const sparklineConfigs = [
        { id: 'revenueSparkline', data: [2.1, 2.2, 2.0, 2.3, 2.4, 2.5, 2.4], color: '#107c10' },
        { id: 'customersSparkline', data: [1100, 1150, 1200, 1180, 1220, 1240, 1247], color: '#0078d4' },
        { id: 'conversionSparkline', data: [3.5, 3.4, 3.6, 3.3, 3.2, 3.1, 3.2], color: '#d13438' },
        { id: 'aovSparkline', data: [1800, 1850, 1900, 1920, 1950, 1960, 1967], color: '#ff8c00' }
    ];
    
    sparklineConfigs.forEach(config => {
        const ctx = document.getElementById(config.id);
        if (ctx) {
            charts[config.id] = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', ''],
                    datasets: [{
                        data: config.data,
                        borderColor: config.color,
                        backgroundColor: config.color + '20',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: { display: false },
                        y: { display: false }
                    },
                    elements: {
                        point: { radius: 0 }
                    }
                }
            });
        }
    });
}

// Initialize main dashboard charts
function initializeMainCharts() {
    // Destroy existing chart instances if they exist
    if (charts.revenueChart) charts.revenueChart.destroy();
    if (charts.regionChart) charts.regionChart.destroy();
    if (charts.customerChart) charts.customerChart.destroy();
    if (charts.productChart) charts.productChart.destroy();

    // Revenue Trend Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        charts.revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: currentData.revenue.labels,
                datasets: [{
                    label: 'Revenue',
                    data: currentData.revenue.data,
                    borderColor: '#0078d4',
                    backgroundColor: 'rgba(0, 120, 212, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000000).toFixed(1) + 'M';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Sales by Region Chart
    const regionCtx = document.getElementById('regionChart');
    if (regionCtx) {
        charts.regionChart = new Chart(regionCtx, {
            type: 'doughnut',
            data: {
                labels: currentData.regions.labels,
                datasets: [{
                    data: currentData.regions.data,
                    backgroundColor: ['#0078d4', '#107c10', '#ff8c00', '#5c2d91'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
    
    // Customer Acquisition Chart
    const customerCtx = document.getElementById('customerChart');
    if (customerCtx) {
        charts.customerChart = new Chart(customerCtx, {
            type: 'bar',
            data: {
                labels: currentData.customers.labels,
                datasets: [{
                    label: 'New Customers',
                    data: currentData.customers.data,
                    backgroundColor: '#107c10',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Product Performance Chart
    const productCtx = document.getElementById('productChart');
    if (productCtx) {
        // Destroy existing chart if it exists
        if (charts.productChart) {
            charts.productChart.destroy();
        }
        charts.productChart = new Chart(productCtx, {
            type: 'bar',
            data: {
                labels: currentData.products.labels,
                datasets: [{
                    label: 'Revenue',
                    data: currentData.products.data,
                    backgroundColor: ['#0078d4', '#107c10', '#ff8c00', '#5c2d91'],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            }
                        }
                    }
                }
            }
        });
    }

    // Sales by Sector Chart
    const sectorCtx = document.getElementById('sectorChart');
    if (sectorCtx) {
        // Destroy existing chart if it exists
        if (charts.sectorChart) {
            charts.sectorChart.destroy();
        }
        charts.sectorChart = new Chart(sectorCtx, {
            type: 'doughnut',
            data: {
                labels: currentData.sectors.labels,
                datasets: [{
                    data: currentData.sectors.data,
                    backgroundColor: ['#0078d4', '#107c10', '#ff8c00', '#5c2d91', '#8a2be2'], // Added a new color for the 5th sector
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }
}

// Initialize filters
function initializeFilters() {
    const dateFilter = document.getElementById('dateFilter');
    const regionFilter = document.getElementById('regionFilter');
    
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            updateChartsData('date', this.value);
        });
    }
    
    if (regionFilter) {
        regionFilter.addEventListener('change', function() {
            updateChartsData('region', this.value);
        });
    }
    
    // Chart period buttons
    const chartButtons = document.querySelectorAll('.chart-btn');
    chartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            chartButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const period = this.getAttribute('data-period');
            updateRevenueChart(period);
        });
    });
}

// Initialize modal functionality
function initializeModal() {
    const shareBtn = document.getElementById('shareBtn');
    const modal = document.getElementById('shareModal');
    const closeModal = document.getElementById('closeModal');
    const addMemberBtn = document.getElementById('addMember');
    const copyLinkBtn = document.getElementById('copyLink');
    
    if (shareBtn && modal) {
        shareBtn.addEventListener('click', function() {
            modal.classList.add('active');
        });
    }
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', addTeamMember);
    }
    
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', copyShareLink);
    }
    
    // Remove member buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('member-remove')) {
            e.target.closest('.team-member').remove();
        }
    });
}

// Initialize workspace functionality
function initializeWorkspace() {
    const workspaceItems = document.querySelectorAll('.workspace-item');
    const workspaceSelect = document.getElementById('workspaceSelect');
    
    workspaceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            workspaceItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update dashboard title
            const workspaceName = this.textContent.trim();
            updateDashboardTitle(workspaceName);
        });
    });
    
    if (workspaceSelect) {
        workspaceSelect.addEventListener('change', function() {
            updateDashboardTitle(this.options[this.selectedIndex].text);
        });
    }
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const productSearch = document.getElementById('productSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.toLowerCase();
            console.log('Searching for:', query);
            // Implement search functionality
        }, 300));
    }
    
    if (productSearch) {
        productSearch.addEventListener('input', function() {
            filterTable(this.value);
        });
    }
}

// Initialize data table functionality
function initializeDataTable() {
    const exportTableBtn = document.getElementById('exportTable');
    
    if (exportTableBtn) {
        exportTableBtn.addEventListener('click', function() {
            exportTableToCSV();
        });
    }
    
    // Make table sortable
    const tableHeaders = document.querySelectorAll('.data-table th');
    tableHeaders.forEach((header, index) => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', function() {
            sortTable(index);
        });
    });
}

// Update dashboard data
function updateDashboardData() {
    console.log('Dashboard data refreshed.');
    // Simulate fetching new data
    currentData = generateSampleData();
    updateKPIValues();
    initializeMainCharts(); // Re-initialize charts with new data
    updateChartsData('date', document.getElementById('dateFilter').value); // Apply current filter to new data
}

// Make updateDashboardData globally accessible for voice control
window.refreshDashboardData = updateDashboardData;

function updateKPIValues() {
    const kpis = {
        revenue: { value: 2.5 + (Math.random() * 0.4 - 0.2), change: (Math.random() * 5 - 2.5) },
        customers: { value: 1300 + Math.floor(Math.random() * 100 - 50), change: (Math.random() * 8 - 4) },
        conversion: { value: 3.5 + (Math.random() * 0.5 - 0.25), change: (Math.random() * 3 - 1.5) },
        aov: { value: 1900 + Math.floor(Math.random() * 50 - 25), change: (Math.random() * 2 - 1) }
    };

    document.querySelectorAll('.kpi-card').forEach(card => {
        const type = card.dataset.kpiType;
        if (kpis[type]) {
            const valueEl = card.querySelector('.kpi-value');
            const changeEl = card.querySelector('.kpi-change');
            const sparklineCanvas = card.querySelector('canvas');

            if (valueEl) {
                if (type === 'revenue') valueEl.textContent = `$'${kpis[type].value.toFixed(1)}M`;
                else if (type === 'conversion') valueEl.textContent = `${kpis[type].value.toFixed(1)}%`;
                else valueEl.textContent = kpis[type].value.toLocaleString();
            }
            if (changeEl) {
                changeEl.textContent = `${kpis[type].change > 0 ? '+' : ''}${kpis[type].change.toFixed(1)}%`;
                changeEl.classList.toggle('positive', kpis[type].change > 0);
                changeEl.classList.toggle('negative', kpis[type].change < 0);
            }
            // Update sparklines if they exist (re-initialize for simplicity in this demo)
            if (sparklineCanvas && charts[sparklineCanvas.id]) {
                // Simulate new data for sparkline
                const newData = charts[sparklineCanvas.id].data.datasets[0].data.slice(1);
                newData.push(kpis[type].value); // Add new data point (simple, could be more complex)
                charts[sparklineCanvas.id].data.datasets[0].data = newData;
                charts[sparklineCanvas.id].update();
            }
        }
    });
}

// Update charts based on filters
function updateChartsData(filterType, value) {
    console.log(`Updating charts data for filter: ${filterType}, value: ${value}`);
    // This function already updates charts based on filters
    // We will now make it capable of being called by voice commands
    currentData = generateSampleData(value); // Regenerate data based on filter value
    initializeMainCharts(); // Re-render main charts with new filtered data
    updateKPIValues(); // Update KPIs based on new data
}

// Make applyDashboardFilter globally accessible for voice control
window.applyDashboardFilter = function(filterType, value) {
    const dateFilterElement = document.getElementById('dateFilter');
    const regionFilterElement = document.getElementById('regionFilter');

    if (filterType === 'date' && dateFilterElement) {
        // Find the option element that matches the value and set it as selected
        let optionFound = false;
        for (let i = 0; i < dateFilterElement.options.length; i++) {
            if (dateFilterElement.options[i].value.toLowerCase().includes(value.toLowerCase())) {
                dateFilterElement.value = dateFilterElement.options[i].value;
                optionFound = true;
                break;
            }
        }
        if (!optionFound) {
            console.warn(`No matching date filter option found for: ${value}. Defaulting to 'Last 30 days'.`);
            dateFilterElement.value = 'Last 30 days'; // Fallback
        }
        dateFilterElement.dispatchEvent(new Event('change')); // Trigger change event
        alert(`Dashboard filtered by: ${dateFilterElement.value}`);
    } else if (filterType === 'region' && regionFilterElement) {
        // Similar logic for region filter if implemented
        regionFilterElement.value = value;
        regionFilterElement.dispatchEvent(new Event('change'));
        alert(`Dashboard filtered by region: ${value}`);
    }
    console.log(`[Dashboard] Applying voice filter: ${filterType} = ${value}`);
};

// Make showKpiDetails globally accessible for voice control
window.showKpiDetails = function(kpiType) {
    console.log(`[Dashboard] Showing details for KPI: ${kpiType}`);
    let detailsMessage = `Details for ${kpiType}: \n`;
    
    switch (kpiType) {
        case 'revenue':
            detailsMessage += 'Total revenue reflects all sales transactions across all products and regions.';
            // In a full implementation, you might open a modal with more detailed revenue charts/tables.
            break;
        case 'customers':
            detailsMessage += 'Customer data includes active users, new sign-ups, and churned accounts.';
            break;
        case 'conversion rate':
            detailsMessage += 'Conversion rate is the percentage of website visitors who complete a desired goal, such as making a purchase.';
            break;
        case 'aov':
            detailsMessage += 'Average Order Value (AOV) is the average amount of money spent per order.';
            break;
        default:
            detailsMessage += 'No specific details available for this KPI yet.';
    }
    alert(detailsMessage);
};

// Update revenue chart based on period
function updateRevenueChart(period) {
    if (!charts.revenueChart) return;
    
    let labels, data;
    
    switch (period) {
        case 'daily':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [340000, 380000, 420000, 390000, 450000, 380000, 360000];
            break;
        case 'weekly':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [2100000, 2300000, 2200000, 2400000];
            break;
        case 'monthly':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
            data = [1200000, 1350000, 1100000, 1800000, 2100000, 2400000];
            break;
        default:
            return;
    }
    
    charts.revenueChart.data.labels = labels;
    charts.revenueChart.data.datasets[0].data = data;
    charts.revenueChart.update('active');
}

// Add team member
function addTeamMember() {
    const emailInput = document.getElementById('shareEmail');
    const permissionSelect = document.getElementById('sharePermission');
    const teamMembers = document.querySelector('.team-members');
    
    if (!emailInput.value || !teamMembers) return;
    
    const memberDiv = document.createElement('div');
    memberDiv.className = 'team-member';
    memberDiv.innerHTML = `
        <div class="member-avatar">${emailInput.value.charAt(0).toUpperCase()}</div>
        <div class="member-info">
            <div class="member-name">${emailInput.value.split('@')[0]}</div>
            <div class="member-email">${emailInput.value}</div>
        </div>
        <div class="member-role">${permissionSelect.options[permissionSelect.selectedIndex].text}</div>
        <button class="member-remove">Remove</button>
    `;
    
    teamMembers.appendChild(memberDiv);
    emailInput.value = '';
}

// Copy share link
function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    if (shareLink) {
        shareLink.select();
        document.execCommand('copy');
        
        const copyBtn = document.getElementById('copyLink');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#107c10';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
    }
}

// Filter table
function filterTable(query) {
    const table = document.getElementById('productsTable');
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

// Sort table
function sortTable(columnIndex) {
    const table = document.getElementById('productsTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();
        
        // Check if numeric
        const aNum = parseFloat(aText.replace(/[$,%]/g, ''));
        const bNum = parseFloat(bText.replace(/[$,%]/g, ''));
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return bNum - aNum; // Descending for numbers
        }
        
        return aText.localeCompare(bText); // Ascending for text
    });
    
    rows.forEach(row => tbody.appendChild(row));
}

// Export table to CSV
function exportTableToCSV() {
    const table = document.getElementById('productsTable');
    const rows = table.querySelectorAll('tr');
    const csv = [];
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = Array.from(cols).map(col => col.textContent.trim());
        csv.push(rowData.join(','));
    });
    
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Export dashboard
function exportDashboard() {
    // Simulate dashboard export
    const exportBtn = document.getElementById('exportBtn');
    const originalText = exportBtn.textContent;
    
    exportBtn.textContent = 'Exporting...';
    exportBtn.disabled = true;
    
    setTimeout(() => {
        exportBtn.textContent = 'Downloaded!';
        exportBtn.style.background = '#107c10';
        
        setTimeout(() => {
            exportBtn.textContent = originalText;
            exportBtn.disabled = false;
            exportBtn.style.background = '';
        }, 2000);
    }, 1500);
}

// Update dashboard title
function updateDashboardTitle(workspaceName) {
    const title = document.querySelector('.dashboard-title');
    if (title) {
        title.textContent = `${workspaceName} - Sales Performance Dashboard`;
    }
}

// Generate sample data
function generateSampleData(filter = null) {
    const baseRevenue = [1200000, 1350000, 1100000, 1800000, 2100000, 2400000];
    const variation = () => (Math.random() - 0.5) * 200000;
    
    return {
        revenue: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: baseRevenue.map(val => Math.max(val + variation(), 500000))
        },
        regions: {
            labels: ['North', 'South', 'East', 'West'],
            data: [35, 25, 25, 15].map(val => val + Math.floor((Math.random() - 0.5) * 10))
        },
        customers: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [120, 135, 110, 180, 210, 240].map(val => val + Math.floor((Math.random() - 0.5) * 20))
        },
        products: {
            labels: ['Premium Widget Pro', 'Standard Widget', 'Basic Widget', 'Widget Accessories'],
            data: [456789, 234567, 123456, 89012].map(val => val + Math.floor((Math.random() - 0.5) * 50000))
        },
        sectors: {
            labels: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing'],
            data: [1200000, 800000, 600000, 500000, 400000]
        }
    };
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

