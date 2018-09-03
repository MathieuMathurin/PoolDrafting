export function addFilter(query, filters) {
    //Position filter
    if (filters.position) {
        query = query + " AND Position:" + filters.position;
    }

    //Team filter
    if (filters.teamID) {
        query = query + " AND TeamID:" + filters.teamID;
    }

    //Salary filter
    if (filters.salary) {
        var bounds = filters.salary.split("-");
        var min = bounds[0];
        var max = bounds[1];

        query = query + " AND Prediction.SAL: [" + min + " TO " + max + "]"; //[ ] is inclusive, { } is exclusive
    }

    //Points filter
    if (filters.points) {
        var bounds = filters.points.split("-");
        var min = bounds[0];
        var max = bounds[1];

        query = query + " AND Prediction.PTS: [" + min + " TO " + max + "]"; //[ ] is inclusive, { } is exclusive
    }

    return query + "&sort=Prediction.PTS:desc";
}