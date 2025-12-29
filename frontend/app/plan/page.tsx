"use client";

import React, { useState } from "react";
import styles from "@/styles/plan.module.css";
import DateSelection from "@/components/dateSelection";
import DateView, { Duration } from "@/components/dateView";
import DateCard from "@/components/dateCard";
import { select } from "framer-motion/client";
import SearchBar from "@/components/searchBar";
import ContainerLabel from "@/components/containerLabel";
import MealTimes from "@/components/mealTimes";
import MealList from "@/components/mealList";

const Page = () => {
  const meals = [
    { name: "Mac and Cheese", calories: 123 },
    { name: "Grilled Chicken Salad", calories: 350 },
    { name: "Beef Tacos", calories: 450 },
    { name: "Vegetable Stir Fry", calories: 300 },
    { name: "Spaghetti Bolognese", calories: 550 },
    { name: "Avocado Toast", calories: 250 },
    { name: "Cheeseburger", calories: 700 },
    { name: "Quinoa and Black Bean Bowl", calories: 400 },
    { name: "Salmon with Rice and Veggies", calories: 500 },
    { name: "Pancakes with Syrup", calories: 600 },
    { name: "Chicken Curry with Naan", calories: 650 },
    { name: "Greek Yogurt Parfait", calories: 200 },
    { name: "Shrimp Fried Rice", calories: 480 },
    { name: "Veggie Omelette", calories: 280 },
    { name: "BBQ Ribs with Mashed Potatoes", calories: 800 },
    { name: "Caesar Salad", calories: 330 },
    { name: "Sushi Roll", calories: 220 },
    { name: "Mushroom Risotto", calories: 430 },
    { name: "Falafel Wrap", calories: 370 },
    { name: "Lentil Soup", calories: 180 },
    { name: "Chicken Alfredo Pasta", calories: 620 },
    { name: "Beef Stir Fry", calories: 510 },
    { name: "Veggie Burger", calories: 380 },
    { name: "Tuna Salad", calories: 290 },
    { name: "Fruit Smoothie Bowl", calories: 260 },
    { name: "Eggplant Parmesan", calories: 540 },
    { name: "Pulled Pork Sandwich", calories: 610 },
    { name: "Chicken Fajitas", calories: 470 },
    { name: "Baked Ziti", calories: 560 },
    { name: "Stuffed Peppers", calories: 400 },
    { name: "Seafood Paella", calories: 650 },
    { name: "Veggie Quesadilla", calories: 420 },
    { name: "Chicken Caesar Wrap", calories: 430 },
    { name: "Beef Chili", calories: 480 },
    { name: "Spinach and Feta Omelette", calories: 310 },
    { name: "Turkey Sandwich", calories: 350 },
    { name: "Pad Thai", calories: 590 },
    { name: "Grilled Salmon Salad", calories: 360 },
    { name: "Chicken Teriyaki", calories: 520 },
    { name: "Minestrone Soup", calories: 190 },
    { name: "Vegetable Curry", calories: 410 },
    { name: "Fish and Chips", calories: 720 },
    { name: "Caprese Salad", calories: 270 },
    { name: "Stuffed Mushrooms", calories: 230 },
    { name: "Beef Burger with Fries", calories: 750 },
    { name: "Vegan Buddha Bowl", calories: 390 },
    { name: "Chicken Tikka Masala", calories: 640 },
    { name: "Shrimp Tacos", calories: 450 },
    { name: "Pasta Primavera", calories: 500 },
    { name: "Cobb Salad", calories: 380 },
    { name: "Ratatouille", calories: 220 },
    { name: "Buffalo Wings", calories: 600 },
    { name: "Miso Soup", calories: 150 },
    { name: "Grilled Cheese Sandwich", calories: 320 },
    { name: "Beef Stroganoff", calories: 670 },
    { name: "Vegetable Lasagna", calories: 520 },
    { name: "Chicken Noodle Soup", calories: 210 },
    { name: "BBQ Chicken Pizza", calories: 680 },
    { name: "Tofu Stir Fry", calories: 350 },
    { name: "Clam Chowder", calories: 280 },
    { name: "Egg Salad Sandwich", calories: 330 },
    { name: "Lamb Kebabs", calories: 580 },
    { name: "Chicken Enchiladas", calories: 600 },
    { name: "Vegetable Samosas", calories: 240 },
    { name: "Shrimp Scampi", calories: 520 },
    { name: "Grilled Vegetable Panini", calories: 370 },
    { name: "Turkey Meatballs with Pasta", calories: 540 },
    { name: "Veggie Chili", calories: 400 },
    { name: "Crab Cakes", calories: 450 },
    { name: "Bulgur Salad", calories: 290 },
    { name: "Teriyaki Tofu Bowl", calories: 380 },
    { name: "Beef Burrito", calories: 630 },
    { name: "Chicken Shawarma Wrap", calories: 500 },
    { name: "Seafood Gumbo", calories: 610 },
    { name: "Vegetable Tempura", calories: 330 },
    { name: "Chicken Pot Pie", calories: 700 },
    { name: "Quiche Lorraine", calories: 450 },
    { name: "Veggie Sushi", calories: 210 },
    { name: "Pork Schnitzel", calories: 680 },
    { name: "Lobster Roll", calories: 550 },
    { name: "Falafel Bowl", calories: 400 },
    { name: "Beef Gyro", calories: 470 },
    { name: "Vegetable Pad See Ew", calories: 430 },
    { name: "Stuffed Cabbage Rolls", calories: 410 },
    { name: "Chicken Parmesan", calories: 650 },
    { name: "Pulled Chicken Sandwich", calories: 520 },
    { name: "Vegan Chili", calories: 390 },
    { name: "Spaghetti Carbonara", calories: 600 },
    { name: "Clam Linguine", calories: 550 },
    { name: "Grilled Veggie Tacos", calories: 350 },
    { name: "Beef Enchiladas", calories: 610 },
    { name: "Chili Cheese Fries", calories: 720 },
    { name: "Vegetable Fried Rice", calories: 380 },
    { name: "Chicken Burrito Bowl", calories: 540 },
    { name: "Seafood Risotto", calories: 600 },
    { name: "Vegan Pad Thai", calories: 420 },
    { name: "Roast Beef Sandwich", calories: 470 },
    { name: "Stuffed Zucchini Boats", calories: 390 },
    { name: "Cheese Quesadilla", calories: 400 },
    { name: "Chicken and Waffles", calories: 700 },
    { name: "Beef Tostadas", calories: 520 },
    { name: "Veggie Burger with Sweet Potato Fries", calories: 480 },
    { name: "Mushroom Soup", calories: 180 },
    { name: "Chicken and Rice Casserole", calories: 600 },
    { name: "Falafel Pita", calories: 350 },
    { name: "Salmon Teriyaki", calories: 500 },
    { name: "Spinach Lasagna", calories: 540 },
    { name: "Shrimp Po’ Boy", calories: 580 },
    { name: "Vegetable Curry with Rice", calories: 450 },
    { name: "BBQ Pulled Pork Tacos", calories: 620 },
  ];

  const [filterText, setFilterText] = useState<string>("");

  // Helper to define which dates are valid
  const isDisabled = (date: Date) => date.getDay() !== 0; // Only allow Sundays

  // Function to get closest valid date to today
  const getClosestValidDateToToday = (
    isDisabledFn: (date: Date) => boolean
  ) => {
    const today = new Date();
    if (!isDisabledFn(today)) return today;

    for (let offset = 1; offset <= 365; offset++) {
      const forward = new Date(today);
      forward.setDate(today.getDate() + offset);
      if (!isDisabledFn(forward)) return forward;

      const backward = new Date(today);
      backward.setDate(today.getDate() - offset);
      if (!isDisabledFn(backward)) return backward;
    }

    return today; // fallback
  };

  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    getClosestValidDateToToday(isDisabled)
  );
  const [view, setView] = useState<Duration>(Duration.OneWeek);

  // Generate days
  const numDays = 31;
  const dates = Array.from({ length: numDays }, (_, i) => {
    const d = new Date(selectedDate);
    d.setDate(selectedDate.getDate() + i);
    return d;
  });

  // Determine which dates to display based on the view
  const viewIndex = Object.values(Duration).indexOf(view) + 1; // 1-based
  const visibleDates = dates.slice(0, viewIndex * 7);

  return (
    <div className={styles.planContainer}>
      <div className={styles.dateView}>
        <DateSelection
          weekday="Sunday"
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
        <DateView
          options={Object.values(Duration)}
          selected={view}
          onSelect={setView}
        />
      </div>

      <div className={styles.datePlan}>
        {visibleDates.map((date) => (
          <DateCard key={date.toISOString()} date={date} />
        ))}
      </div>

      <div className={styles.searchSelection}>
        <ContainerLabel label="Meals">
          <SearchBar
            value={filterText}
            placeholder={"Search Meals"}
            onChange={(value: string) => setFilterText(value)}
          />
        </ContainerLabel>

        <MealTimes />
      </div>
      <div className={styles.mealsList}>
        <MealList meals={meals} filterText={filterText} />
      </div>
    </div>
  );
};

export default Page;
