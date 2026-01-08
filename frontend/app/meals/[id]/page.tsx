import MealForm from "@/components/mealForm";
import styles from "@/styles/mealId.module.css";
import { getMealById, updateMeal } from "@/services/mealService";

interface PageProps {
  params: {
    id: string;
  };
}

async function Page({ params }: PageProps) {
  const id = (await params).id;
  const initialMeal = await getMealById(id);

  return (
    <div className={styles["container"]}>
      <MealForm
        title="Update Meal"
        submit={updateMeal}
        mealId={id}
        initialMeal={initialMeal}
      />
    </div>
  );
}

export default Page;
