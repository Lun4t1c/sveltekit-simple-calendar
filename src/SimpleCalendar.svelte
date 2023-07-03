<script lang="ts">
    import { onMount } from 'svelte';
  
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let weeks = [];
  
    const generateCalendar = () => {
      weeks = [];
      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const startingDay = firstDayOfMonth.getDay() || 7; // Adjust for Monday as the first day
      const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();
      const numRows = Math.ceil((startingDay + numDays) / 7);
  
      let day = 1;
  
      for (let row = 0; row < numRows; row++) {
        let week = [];
  
        for (let col = 1; col <= 7; col++) {
          if ((row === 0 && col < startingDay) || day > numDays) {
            week.push(null);
          } else {
            week.push(day);
            day++;
          }
        }
  
        weeks.push(week);
      }
    };
  
    onMount(generateCalendar);
  
    const previousMonth = () => {
      if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
      } else {
        currentMonth--;
      }
      generateCalendar();
    };
  
    const nextMonth = () => {
      if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
      } else {
        currentMonth++;
      }
      generateCalendar();
    };
  </script>

<body>
    <!-- TOP CONTROLS -->
    <div>
        <button class="btn-nav">
            {"<"}
        </button>

        <button class="btn-nav">
            {">"}
        </button>
    </div>

    <!-- MAIN TABLE -->
    <div class="calendar">
        <div class="header">
          <span class="previous" on:click={previousMonth}>&lt;</span>
          <span>{currentMonth + 1}/{currentYear}</span>
          <span class="next" on:click={nextMonth}>&gt;</span>
        </div>
        
        <div class="grid">
          <div class="day">Mon</div>
          <div class="day">Tue</div>
          <div class="day">Wed</div>
          <div class="day">Thu</div>
          <div class="day">Fri</div>
          <div class="day">Sat</div>
          <div class="day">Sun</div>
      
          {#each weeks as week}
            {#each week as day}
              {#if day === null}
                <div class="day"></div>
              {:else}
                <div class="day">{day}</div>
              {/if}
            {/each}
          {/each}
        </div>
      </div>
</body>

<style>
    .calendar {
    font-family: Arial, sans-serif;
    margin: 20px auto;
    max-width: 300px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .previous,
  .next {
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    background-color: #ddd;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .day {
    padding: 5px;
    text-align: center;
  }

    .btn-nav {
        background-color: darkblue;
        font-size: 20px;
        height: fit-content;
        width: fit-content;
    }
    .btn-nav:hover {
        background-color: blue;
    }
    .btn-nav:active {
        background-color: lightblue;
    }
</style>
