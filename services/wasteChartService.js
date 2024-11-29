require('dotenv').config();

const CHART_URL = process.env.API_CHARTS_URL;
// Get chart per month and year, grouped by department
exports.getWasteRecordsByMonth = async (month, year, type) => {
    const url = `${CHART_URL}/visualize-${type}-chart/?month=${month}&year=${year}`;

    return url;
};


// Get chart per year, grouped by department
exports.getWasteRecordsByYear = async (year, type) => {
    const url = `${CHART_URL}/visualize-${type}-chart/?year=${year}`;

    return url;
};

exports.getWasteRecordsByDay = async (day, month, year, type) => {
    const url = `${CHART_URL}/visualize-${type}-chart/?day=${day}&month=${month}&year=${year}`;

    return url;
};