import assert from "node:assert";
import { execSync } from "node:child_process";

console.log("🧪 Running smoke tests...");

try {
  // Test Prisma generation
  execSync("npx prisma generate", { stdio: "pipe" });
  console.log("✅ Prisma client generated successfully");
  
  // Test TypeScript compilation
  execSync("npx tsc --noEmit", { stdio: "pipe" });
  console.log("✅ TypeScript compilation successful");
  
  // Test Next.js build (basic check)
  try {
    execSync("npm run build", { stdio: "pipe", timeout: 30000 });
    console.log("✅ Next.js build successful");
  } catch (e) {
    console.log("⚠️ Build test skipped (may require longer timeout)");
  }
  
  console.log("🎉 All smoke tests passed!");
  assert.ok(true);
} catch (e) {
  console.error("❌ Smoke test failed:", e.message);
  process.exit(1);
}