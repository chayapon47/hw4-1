// Key สำหรับ Local Storage
const LOCAL_STORAGE_KEY = "expenseTracker";

// อ่านข้อมูลจาก Local Storage
function getExpenses() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

// บันทึกข้อมูลลง Local Storage
function saveExpenses(expenses) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
}

// เพิ่มค่าใช้จ่าย
function addExpense(expenseData) {
  const expenses = getExpenses();
  expenses.push(expenseData);
  saveExpenses(expenses);
  renderExpenses();
}

// แสดงรายการค่าใช้จ่าย
function renderExpenses() {
  const expenseList = document.getElementById("expenseList");
  const expenses = getExpenses();

  expenseList.innerHTML = expenses
    .map(
      (expense) =>
        `<li class="flex justify-between bg-gray-100 p-3 rounded">
          <span>${expense.title} (${expense.category})</span>
          <span>${expense.amount} - ${expense.date}</span>
        </li>`
    )
    .join("");
}

// สร้างรายงานรายเดือน
function generateMonthlyReport() {
  const expenses = getExpenses();
  const report = expenses.reduce((acc, expense) => {
    const month = expense.date.slice(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = 0;
    acc[month] += expense.amount;
    return acc;
  }, {});

  const reportList = document.getElementById("monthlyReport");
  reportList.innerHTML = Object.entries(report)
    .map(
      ([month, total]) =>
        `<li class="flex justify-between bg-gray-100 p-3 rounded">
          <span>${month}</span>
          <span>${total}</span>
        </li>`
    )
    .join("");
}

// ฟังก์ชันเริ่มต้น
function init() {
  const expenseForm = document.getElementById("expenseForm");
  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (title && amount && category && date) {
      addExpense({ title, amount, category, date });
      expenseForm.reset();
      generateMonthlyReport();
    }
  });

  renderExpenses();
  generateMonthlyReport();
}

// เรียกใช้ฟังก์ชันเริ่มต้น
init();