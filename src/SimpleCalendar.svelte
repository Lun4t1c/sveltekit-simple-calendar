<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    const MONTH_NAMES = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    let currentDate = new Date();
  
    let selectedDate = writable(null);
  
    let calendarData = writable([]);
  
    onMount(() => {
      generateCalendarData(currentDate.getMonth(), currentDate.getFullYear());
    });
  
    function generateCalendarData(month, year) {
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
  
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const lastDayOfWeek = lastDayOfMonth.getDay();
  
      const calendarRows = [];
      let row = [];
  
      // Add empty cells for days before the first of the month
      for (let i = 0; i < firstDayOfWeek; i++) {
        row.push({ day: null });
      }
  
      // Add cells for each day in the month
      for (let i = 1; i <= daysInMonth; i++) {
        row.push({ day: i });
        // Start a new row after every 7 days
        if ((i + firstDayOfWeek) % 7 === 0) {
          calendarRows.push(row);
          row = [];
        }
      }
  
      // Add empty cells for days after the last day of the month
      for (let i = lastDayOfWeek; i < 6; i++) {
        row.push({ day: null });
      }
  
      calendarRows.push(row);
  
      calendarData.set(calendarRows);
    }
  
    function prevMonth() {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      generateCalendarData(currentDate.getMonth(), currentDate.getFullYear());
    }
  
    function nextMonth() {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
      generateCalendarData(currentDate.getMonth(), currentDate.getFullYear());
    }
  
    function selectDate(day) {
      if (day) {
        selectedDate.set(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      } else {
        selectedDate.set(null);
      }
    }
  </script>
  
  <div class="calendar">
    <div class="header">
      <button on:click={prevMonth}>&lt;</button>
      <h2>{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
      <button on:click={nextMonth}>&gt;</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        {#each $calendarData as row}
          <tr>
            {#each row as cell}
              <td class:empty={cell.day === null} class:selected={selectedDate && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear() && selectedDate.getDate() === cell.day} on:click={() => selectDate(cell.day)}>
                {#if cell.day !== null}
                  <span>{cell.day}</span>
                {/if}
              </td>
            {/each}
         
        </tr>
        {/each}
      </tbody>
    </table>
</div>

<style>
  .calendar {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    font-family: Arial, sans-serif;
    font-size: 16px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }

  th {
    background-color: #eee;
  }

  td.empty {
    background-color: #f8f8f8;
  }

  td.selected {
    background-color: #3498db;
    color: #fff;
  }
</style>