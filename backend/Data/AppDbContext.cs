using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        { }

        public DbSet<User> users { get; set; }
        public DbSet<Meal> meals { get; set; }
        public DbSet<Ingredient> ingredients { get; set; }
        public DbSet<MealIngredient> meal_ingredients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MealIngredient>()
                .HasOne(mi => mi.meal)
                .WithMany(m => m.meal_ingredients)
                .HasForeignKey(mi => mi.meal_id)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MealIngredient>()
                .HasOne(mi => mi.ingredient)
                .WithMany(i => i.meal_ingredients)
                .HasForeignKey(mi => mi.ingredient_id)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}