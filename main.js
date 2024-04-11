// Parse the JSON data
const data = [
  {
    time: "12:00 AM",
    value: 900,
    label: "900CAL",
  },
  {
    time: "6:00 AM",
    value: 0,
    label: "Good job",
  },
  {
    time: "12:00 PM",
    value: 600,
    label: null,
  },
  {
    time: "6:00 PM",
    value: 150,
    label: null,
  },
  {
    time: "9:00 PM",
    value: 450,
    label: "Good job",
  },
  {
    time: "10:00 PM",
    value: 450,
    label: "Good job",
  },
];

// Set up the dimensions of the chart
const margin = { top: 20, right: 40, bottom: 20, left: 50 };
const width = 550 - margin.left - margin.right;
const height = 180 - margin.top - margin.bottom;

// Create the SVG container
const svg = d3
  .select("#chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Add the x and y scales
const x = d3.scaleBand().range([0, 320]).padding(0.9);

const y = d3.scaleLinear().range([height, 0]);

// Set the domains for the scales
x.domain(data.map((d) => d.time));
y.domain([d3.min(data, (d) => d.value - 50), d3.max(data, (d) => d.value)]);

// Create the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y);

// Add the x and y axes to the chart
svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

svg.append("g").call(yAxis);

const colors = ["steelblue", "green", "red", "purple", "orange"];

// Create the bars
svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("fill", (d, i) => colors[(Math.random() * colors.length) | 0])
  .attr("x", (d) => x(d.time))
  .attr("width", x.bandwidth())
  .attr("y", (d) => y(d.value))
  .attr("height", (d) => height - y(d.value))
  .append("title")
  .text((d) => d.label);

const calendar = document.getElementById("calendar");
// add 12 divs to the calendar
const divs = Array.from({ length: 12 }, (_, i) => {
  const div = document.createElement("div");
  div.className = "border-b-2 w-full px-4 pb-2 font-semibold";
  div.textContent = `${((i + 6) % 12 == 0 ? 12 : (i + 6) % 12).toString().padStart(2, '0')}:00 AM`;
  return div;
});

calendar.append(...divs);

const task = document.createElement("div");
task.className = 'p-2 bg-black absolute rounded-full text-center font-semibold';
const calHeight = calendar.clientHeight;
task.style.top = `${calHeight / 12 * (7.5 - 6) - 12}px`;
task.style.right = '24px';
task.style.background = 'linear-gradient(-90deg, #D3A4F4 0%, #E9B1E0 100%)';
task.style.color = 'white';
task.style.width = (calendar.clientWidth * 0.6) + 'px';
task.textContent = 'Ab Workout, 7:30am';

calendar.append(task);

const task2 = document.createElement("div");
task2.className = 'p-2 bg-black absolute rounded-full text-center font-semibold';
task2.style.top = `${calHeight / 12 * (9 - 6)}px`;
task2.style.right = '48px';
task2.style.background = 'linear-gradient(-90deg, #D3A4F4 0%, #E9B1E0 100%)';
task2.style.color = 'white';
task2.style.width = (calendar.clientWidth * 0.6) + 'px';
task2.textContent = 'Upperbody Workout, 9am';

calendar.append(task2);

const task3 = document.createElement("div");
task3.className = 'p-2 bg-black absolute rounded-full text-center font-semibold';
task3.style.top = `${calHeight / 12 * (15 - 6) + 8}px`;
task3.style.right = '48px';
task3.style.background = '#F1F1F1';
task3.style.width = (calendar.clientWidth * 0.6) + 'px';
task3.textContent = 'Lowerbody Workout, 3pm';

calendar.append(task3);