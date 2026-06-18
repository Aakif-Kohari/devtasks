import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "../../../context/ThemeContext";

const sampleText =
  "DevTasks helps developers build useful tools, manage snippets, and improve daily coding workflows.";

const toWords = (text) =>
  text
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);

const capitalize = (word) =>
  word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "";

const TextCaseConverter = () => {
  const { dark } = useTheme();
  const [input, setInput] = useState("");

  const data = useMemo(() => {
    const words = toWords(input);
    const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
    const lineCount = input ? input.split(/\r\n|\r|\n/).length : 0;

    const camelCase =
      words.length === 0
        ? ""
        : words[0].toLowerCase() +
          words.slice(1).map(capitalize).join("");

    const pascalCase = words.map(capitalize).join("");
    const snakeCase = words.map((word) => word.toLowerCase()).join("_");
    const kebabCase = words.map((word) => word.toLowerCase()).join("-");
    const titleCase = words.map(capitalize).join(" ");
    const urlSlug = input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    return {
      stats: [
        ["Characters", input.length],
        ["Characters No Spaces", input.replace(/\s/g, "").length],
        ["Words", wordCount],
        ["Lines", lineCount],
        ["Reading Time", `${Math.max(1, Math.ceil(wordCount / 200))} min`],
      ],
      transformations: [
        ["camelCase", camelCase],
        ["snake_case", snakeCase],
        ["kebab-case", kebabCase],
        ["PascalCase", pascalCase],
        ["UPPERCASE", input.toUpperCase()],
        ["lowercase", input.toLowerCase()],
        ["Title Case", titleCase],
        ["URL Slug", urlSlug],
      ],
    };
  }, [input]);

  const handleCopy = async (value) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleClear = () => setInput("");
  const handleSample = () => setInput(sampleText);

  return (
    <div
      className={`min-h-[calc(100vh-76px)] px-4 sm:px-6 py-6 transition-colors duration-300 overflow-y-auto relative ${
        dark ? "bg-zinc-950" : "bg-[#F7F7F7]"
      }`}
    >
      <title>Text Case Converter — DevTasks</title>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div
          className={`relative z-10 w-full rounded-[32px] border shadow-xl overflow-hidden transition-all duration-300 ${
            dark ? "bg-zinc-900 border-zinc-800" : "bg-white border-neutral-200"
          }`}
        >
          <div className={`h-2 w-full ${dark ? "bg-white" : "bg-black"}`} />

          <div className="px-5 sm:px-8 pt-6 sm:pt-8 flex items-center gap-3">
            <Link
              to="/devutilities"
              className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 ${
                dark
                  ? "bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white"
                  : "bg-white border-neutral-200 text-neutral-600 hover:text-black"
              }`}
            >
              ←
            </Link>
            <h1
              className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${
                dark ? "text-white" : "text-black"
              }`}
            >
              Text Case Converter
            </h1>
          </div>

          <div className="p-5 sm:p-8 space-y-5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type your text here..."
              className={`w-full h-40 px-4 py-3 rounded-2xl border text-sm outline-none resize-none ${
                dark
                  ? "bg-zinc-950 border-zinc-800 text-white placeholder-zinc-700 focus:border-white"
                  : "bg-neutral-50 border-neutral-300 text-black placeholder-neutral-400 focus:border-black"
              }`}
            />

            <div className="flex gap-3 flex-wrap">
              <button onClick={handleSample} className={`px-4 py-2 rounded-xl border font-bold text-sm ${dark ? "border-white text-white hover:bg-white hover:text-black" : "border-black text-black hover:bg-black hover:text-white"}`}>
                Sample Text
              </button>
              <button onClick={handleClear} className={`px-4 py-2 rounded-xl border font-bold text-sm ${dark ? "border-white text-white hover:bg-white hover:text-black" : "border-black text-black hover:bg-black hover:text-white"}`}>
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {data.stats.map(([label, value]) => (
                <div
                  key={label}
                  className={`p-4 rounded-2xl border ${
                    dark ? "bg-zinc-950 border-zinc-800" : "bg-neutral-50 border-neutral-200"
                  }`}
                >
                  <p className="text-xs font-black uppercase text-zinc-500">{label}</p>
                  <p className={`text-xl font-black ${dark ? "text-white" : "text-black"}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.transformations.map(([label, value]) => (
                <div
                  key={label}
                  className={`p-4 rounded-2xl border ${
                    dark ? "bg-zinc-950 border-zinc-800" : "bg-neutral-50 border-neutral-200"
                  }`}
                >
                  <div className="flex justify-between items-center gap-3 mb-2">
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                      {label}
                    </p>
                    <button
                      onClick={() => handleCopy(value)}
                      className={`px-3 py-1 rounded-lg border text-xs font-bold ${
                        dark
                          ? "border-zinc-700 text-white hover:bg-white hover:text-black"
                          : "border-neutral-300 text-black hover:bg-black hover:text-white"
                      }`}
                    >
                      Copy
                    </button>
                  </div>
                  <p className={`text-sm break-words min-h-6 ${dark ? "text-zinc-200" : "text-zinc-700"}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCaseConverter;