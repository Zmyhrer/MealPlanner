import { NextResponse } from "next/server";

interface Ingredient {
  quantity: string;
  unit: string;
  name: string;
}

interface Meal {
  mealName: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: string;
}

export async function POST(req: Request) {
  try {
    const meal: Meal = await req.json();

    console.log("Received meal:", meal);

    return NextResponse.json(
      { message: "Meal added successfully", meal },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
