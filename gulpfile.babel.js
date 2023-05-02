import autoprefixer from "autoprefixer";
import browserSync from "browser-sync";
import spawn from "cross-spawn";
import cssnano from "cssnano";
import { dest, series, src, task, watch } from "gulp";
import postcss from "gulp-postcss";
import atimport from "postcss-import";
import tailwindcss from "tailwindcss";
import concat from "gulp-concat";
import uglify from "gulp-uglify";

const SITE_ROOT = "./_site";
const POST_BUILD_STYLESHEET = `${SITE_ROOT}/assets/css/`;
const PRE_BUILD_STYLESHEET = "./src/css/style.css";
const TAILWIND_CONFIG = "./tailwind.config.js";
const POST_BUILD_FONTS = `${SITE_ROOT}/assets/fonts/`;
const POST_BUILD_SCRIPTS = `${SITE_ROOT}/assets/js/`;
const POST_BUILD_IMAGES = `${SITE_ROOT}/assets/images/`;

// Fix for Windows compatibility
const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

const isDevelopmentBuild = process.env.NODE_ENV === "development";

task("buildJekyll", () => {
  browserSync.notify("Building Jekyll site...");

  const args = ["exec", jekyll, "build"];

  if (isDevelopmentBuild) {
    args.push("--incremental");
  }

  return spawn("bundle", args, { stdio: "inherit" });
});

task("processStyles", () => {
  browserSync.notify("Compiling styles...");

  return src(PRE_BUILD_STYLESHEET)
    .pipe(
      postcss([
        atimport(),
        tailwindcss(TAILWIND_CONFIG),
        ...(isDevelopmentBuild ? [] : [autoprefixer(), cssnano()]),
      ])
    )
    .pipe(dest(POST_BUILD_STYLESHEET));
});

task("copyFonts", () => {
  browserSync.notify("Copying fonts...");

  return src('./src/fonts/**/*')
    .pipe(dest(POST_BUILD_FONTS))
});

task("optimizeImages", () => {
  browserSync.notify("Optimizing images...");

  return src('./src/img/**/*')
    .pipe(dest(POST_BUILD_IMAGES))
});

task("processScripts", () => {
  browserSync.notify("Compiling scripts...");

  return src(['src/js/tocbot.js', 'src/js/local.js', 'src/js/prism.js'])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest(POST_BUILD_SCRIPTS))
});

task("startServer", () => {
  browserSync.init({
    files: [SITE_ROOT + "/**"],
    open: "local",
    port: 4000,
    server: {
      baseDir: SITE_ROOT,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
  });

  watch(
    [
      "**/*.css",
      "**/*.html",
      "**/**/*.js",
      "**/*.md",
      "**/*.markdown",
      "!_site/**/*",
      "!node_modules/**/*",
    ],
    { interval: 500 },
    buildSite
  );
});

const buildSite = series("buildJekyll", "processScripts", "optimizeImages", "processStyles", "copyFonts");

exports.serve = series(buildSite, "startServer");
exports.default = series(buildSite);