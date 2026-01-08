import AddMealForm from "@/components/mealForm";
import styles from "@/styles/mealId.module.css";

interface PageProps {
  params: {
    id: string;
  };
}

async function Page({ params }: PageProps) {
  const id = (await params).id;
  return (
    <div className={styles["container"]}>
      <AddMealForm />
    </div>
  );
}

export default Page;
