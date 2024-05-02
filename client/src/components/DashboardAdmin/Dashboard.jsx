import { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.scss';
import Chart from 'chart.js/auto';
import UserProfileLeftPanel from '../UserProfileLeftPanel/UserProfileLeftPanel';

const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState(null);

    const handleSetActiveComponent = (component) => {
        setActiveComponent(component);
    };

    const chartRef = useRef(null);
    const bookingChartRef = useRef(null);
    const analyticsCurveRef = useRef(null);
    const [analyticsData, setAnalyticsData] = useState(null);

    const fetchAnalyticsData = () => {
        const data = {
            totalUsers: 1000,
            totalBookings: 1500,
            confirmedBookings: 1200,
            totalVendors:200,
            totalHalls:100,
        };
        setAnalyticsData(data);
    };
    

    useEffect(() => {
        fetchAnalyticsData();

        if (chartRef.current) {
            const chrt = chartRef.current.getContext('2d');
            const myChart = new Chart(chrt, {
                type: 'bar',
                data: {
                    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
                    datasets: [{
                        label: "Website-visits",
                        data: [200, 400, 300, 350, 300, 200],
                        borderWidth: 2,
                    }],
                },
                options: {
                    responsive: false,
                },
            });

            return () => {
                // Cleanup the chart when component unmounts
                myChart.destroy();
            };
        }
    }, []); 
    useEffect(() => {
        // Create booking details chart
        if (bookingChartRef.current) {
            const chrt = bookingChartRef.current.getContext('2d');
            const myChart = new Chart(chrt, {
                type: 'pie',
                data: {
                    labels: ["Confirmed Bookings", "Pending Bookings", "Canceled Bookings"],
                    datasets: [{
                        data: [20,40,80],
                        backgroundColor: ['green', 'yellow', 'red'],
                    }],
                },
                options: {
                    responsive: false,
                },
            });

            return () => {
                // Cleanup the chart when component unmounts
                myChart.destroy();
            };
        }
    }, [analyticsData]); 
    useEffect(() => {
        // Create curve chart for website analytics
        if (analyticsCurveRef.current) {
            const chrt = analyticsCurveRef.current.getContext('2d');
            const myChart = new Chart(chrt, {
                type: 'line',
                data: {
                    labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
                    datasets: [{
                        label: "User Registrations",
                        data:  [50,100,230,450,650,730,500],
                        fill: false,
                        borderColor: 'blue',
                        borderWidth: 2,
                    },
                    {
                        label: "Hall Registrations",
                        data: [100,210,110,134,130,243,250],
                        fill: false,
                        borderColor: 'orange',
                        borderWidth: 2,
                    },
                    {
                        label: "Vendor Registrations",
                        data: [150,200,100,184,190,243,250],
                        fill: false,
                        borderColor: 'green',
                        borderWidth: 2,
                    }],
                    
                },
                options: {
                    responsive: false,
                    tension: 0.5, // Adjust the tension for smoother curves
                },
            });

            return () => {
                // Cleanup the chart when component unmounts
                myChart.destroy();
            };
        }
    }, [analyticsData]);
    const [topLocations, setTopLocations] = useState([]);

    // Dummy data for demonstration
    const dummyData = [
        { location: 'Udupi', bookings: 150 },
        { location: 'Mangalore', bookings: 120 },
        { location: 'Kalyan', bookings: 100 },
        { location: 'Bantwal', bookings: 50 },
        { location: 'Dombivili', bookings: 150 },
        // Add more dummy data as needed
    ];

    // Function to fetch and set top booking locations data
    const fetchTopLocations = () => {
        // Here you would fetch data from your backend or database
        // For now, using dummy data
        setTopLocations(dummyData);
    };

    useEffect(() => {
        fetchTopLocations();
    }, []);

    // Function to calculate percentages
    const calculatePercentages = () => {
        const totalBookings = topLocations.reduce((acc, location) => acc + location.bookings, 0);
        return topLocations.map(location => ({
            location: location.location,
            percentage: ((location.bookings / totalBookings) * 100).toFixed(2)
        }));
    };

    // Function to render top locations as cards
    const renderTopLocationsCards = () => {
        if (!topLocations.length) return;
    
        const percentages = calculatePercentages();
        const top3 = percentages.slice(0, 3);
        const otherPercentages = percentages.slice(3);
        const otherPercentage = otherPercentages.reduce((acc, loc) => acc + parseFloat(loc.percentage), 0).toFixed(2);
    
        return (
            <>
                {top3.map((location, index) => (
                    <div className="analytics-item" key={index}>
                        <div className="location-info">
                            <h2>{location.location}</h2>
                            
                        </div>
                        <div className="percentage">
                            <p>{location.percentage}%</p>
                        </div>
                    </div>
                ))}
                {otherPercentage > 0 && (
                    <div className="analytics-item" key="other">
                        <div className="location-info">
                            <h2>Other</h2>
                            
                        </div>
                        <div className="percentage">
                            <p>{otherPercentage}%</p>
                        </div>
                    </div>
                )}
            </>
        );
    };
    return (
        <>
        <div className="left-panel-container">
      <UserProfileLeftPanel setActiveComponent={handleSetActiveComponent} />
    </div>
        <div className="dashboard-page__container">
            <h1>Analytics Dashboard</h1>
            {analyticsData && (
                <div className="analytics-container">
                    <div className="analytics-item">
                        <h2>Total Users</h2>
                        <p>{analyticsData.totalUsers}</p>
                    </div>
                    <div className="analytics-item">
                        <h2>Total Bookings</h2>
                        <p>{analyticsData.totalBookings}</p>
                    </div>
                    <div className="analytics-item">
                        <h2>Confirmed Bookings</h2>
                        <p>{analyticsData.confirmedBookings}</p>
                    </div>
                    {/* Add other analytics items here */}
                </div>
            )}
    
            <div className="charts">
                <div className="chart-card">
                <h2>User Visits</h2>
                    <canvas id="usr-visit" ref={chartRef} aria-label="chart" width="400" height="300"></canvas>
                </div>
                <div className="chart-card">
                <h2>Booking Trends</h2>
                    <canvas id="booking-chart" ref={bookingChartRef} aria-label="Booking Chart" width="400" height="300"></canvas>
                </div>
                <div className="chart-card">
                <h2>Analytics Curve</h2>
                    <canvas id="analytics-curve" ref={analyticsCurveRef} aria-label="Analytics Curve" width="600" height="400"></canvas>
                </div>
                <div className="chart-card">
                <div className="analytics-container">
                    <div className="analytics-item">
                        <h2>Total Halls</h2>
                        <p>{analyticsData && analyticsData.totalHalls}</p>
                    </div>
                    <div className="analytics-item">
                        <h2>Total Vendors</h2>
                        <p>{analyticsData && analyticsData.totalVendors}</p>
                    </div>
                    
                </div>
                <div className="city-location">
                
                <h2>Top Booking Locations</h2>
                {renderTopLocationsCards()}
            </div>
                </div>
            </div>
        </div>
        </>
    );
    
};

export default Dashboard;
