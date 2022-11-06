function pairTopTwoEmployees(csv) {
  const input = formatCSV(csv);
  const pairs = [];

  for (let i = 0; i < input.length; i++) {
    const employeeRecord = input[i];
    const projectId = parseInt(employeeRecord[1]);

    for (let j = i + 1; j < input.length; j++) {
      const coworkerRecord = input[j];
      const coProjectId = parseInt(coworkerRecord[1]);

      if (projectId === coProjectId) {
        addCoworkTime(pairs, employeeRecord, coworkerRecord);
      }
    }
  }

  const sortedPairsByDuration = pairs.sort((a, b) => {
    return b.duration - a.duration;
  });
  return sortedPairsByDuration[0];
}

function addCoworkTime(pairs, employeeRecord, coworkerRecord) {
  const employeeId = parseInt(employeeRecord[0]);
  const projectId = parseInt(employeeRecord[1]);
  const coworkerId = parseInt(coworkerRecord[0]);
  const daysOverlap = dateRangeOverlaps(employeeRecord, coworkerRecord);

  const pair = findPair(pairs, employeeId, coworkerId);
  if (pair) {
    pair.projectIds.push(projectId);
    pair.duration += daysOverlap;
  } else {
    pairs.push({
      employee1: employeeId,
      employee2: coworkerId,
      projectIds: [projectId],
      duration: daysOverlap,
    });
  }
}

function findPair(pairs, employeeId, coworkerId) {
  return pairs.find((pair) => {
    return (
      (pair.employee1 === employeeId && pair.employee2 === coworkerId) ||
      (pair.employee2 === employeeId && pair.employee1 === coworkerId)
    );
  });
}

function dateRangeOverlaps(employeeRecord, coworkerRecord) {
  const startDateA = new Date(employeeRecord[2]);
  const endDateA = formatDate(employeeRecord[3]);

  const startDateB = new Date(coworkerRecord[2]);
  const endDateB = formatDate(coworkerRecord[3]);

  if (endDateA < startDateB || startDateA > endDateB) {
    return null;
  }

  const obj = {};
  obj.startDate = startDateA <= startDateB ? startDateB : startDateA;
  obj.endDate = endDateA <= endDateB ? endDateA : endDateB;

  return (obj.endDate - obj.startDate) / 86_400_000;
}

function formatDate(date) {
  if (date === "NULL") return new Date();
  else return new Date(date);
}

function formatCSV(csv) {
  const rows = csv.split("\n");
  return rows.map((row) => {
    return row.split(", ");
  });
}

export default pairTopTwoEmployees;
