<script lang="ts">
    import { onMount } from "svelte";

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    let days = [...Array(daysInMonth).keys()];
    let prevMonthDays = [...Array(firstDay).keys()];

    onMount(() => {});
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
        <div class="day">Sun</div>
        <div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
        <div class="day">Sat</div>

        {#each prevMonthDays as day (day)}
            <div class="day other-month">{day + 1}</div>
        {/each}

        {#each days as day (day)}
            <div class="day">{day + 1}</div>
        {/each}
    </div>
</body>


<style>
    .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1px;
        background-color: black;
        padding: 5px;
        border: 1px solid #ccc;
    }

    .day {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(44, 44, 53);
        font-weight: bold;
        height: 40px;
    }

    .day.other-month {
        color: #999;
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
