const clean = (value) => (typeof value === "string" ? value.trim() : "");

const isHttpUrl = (value) => /^https?:\/\/[^\s]+$/i.test(value);
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const configuredCheckoutUrl = clean(import.meta.env.VITE_CHECKOUT_URL);
const configuredSiteUrl = clean(import.meta.env.VITE_SITE_URL).replace(/\/+$/, "");
const configuredContactEmail = clean(import.meta.env.VITE_CONTACT_EMAIL);

export const runtimeConfig = {
  checkoutUrl: isHttpUrl(configuredCheckoutUrl) ? configuredCheckoutUrl : "",
  siteUrl: isHttpUrl(configuredSiteUrl) ? configuredSiteUrl : "",
  contactEmail: isEmail(configuredContactEmail) ? configuredContactEmail : "",
};

export const siteContent = {
  brand: "Temply Studio",
  product: {
    name: "Study Success Bundle",
    shortName: "Study Success Bundle",
    price: 12,
    priceLabel: "$12",
    currency: "USD",
    description:
      "Bộ template số giúp người học lên kế hoạch rõ ràng, giữ nhịp ổn định và trình bày hồ sơ học tập với sự tự tin.",
  },
  meta: {
    title: "Study Success Bundle — Temply Studio",
    description:
      "Học có định hướng. Làm hồ sơ có dấu ấn. Study Success Bundle là bộ template số để lên kế hoạch học tập, theo dõi mục tiêu và chuẩn bị hồ sơ rõ ràng hơn.",
  },
  navItems: [
    { number: "01", label: "Trang chủ", id: "home" },
    { number: "02", label: "Một hệ thống", id: "intro" },
    { number: "03", label: "Bên trong bundle", id: "bundle" },
    { number: "04", label: "Những cách dùng", id: "benefits" },
    { number: "05", label: "Điều Temply tin", id: "principles" },
    { number: "06", label: "Ghi chú học tập", id: "editorial" },
    { number: "07", label: "Nhận bundle", id: "checkout" },
  ],
  hero: {
    eyebrow: "Temply Studio / Study Success Bundle",
    supportingLabel: "Digital planning system for intentional learning",
    title: ["Học có", "định hướng.", "Làm hồ sơ", "có dấu ấn."],
    description:
      "Một bộ template số gọn gàng để bạn lên kế hoạch học tập, theo dõi mục tiêu và trình bày năng lực theo cách của riêng mình.",
    microcopy: "Editable files · Một hệ thống cho những ngày thật",
  },
  statement: {
    label: "02 / A FEW WORDS",
    title: "Một hệ thống có chỗ cho cuộc sống thật.",
    body:
      "Bạn không cần thêm một ứng dụng để quản lý những ứng dụng khác. Bạn cần một điểm bắt đầu đủ rõ để biết việc nào quan trọng, đủ linh hoạt để đổi kế hoạch, và đủ đẹp để muốn quay lại.",
  },
  showcase: [
    {
      number: "01",
      title: "Semester Planner & Weekly Dashboard",
      description:
        "Nhìn cả học kỳ ở một nơi, sau đó thu nhỏ thành tuần và ngày có thể bắt đầu ngay.",
      tags: ["Planner", "Weekly dashboard"],
      visual: "planner",
      alt: "Bố cục planner và weekly dashboard trong Study Success Bundle",
    },
    {
      number: "02",
      title: "Goal Map & Habit Tracker",
      description:
        "Biến mục tiêu lớn thành những dấu mốc nhỏ, có thể xem lại mà không tự gây áp lực.",
      tags: ["Goal map", "Habit tracker"],
      visual: "goals",
      alt: "Goal map và habit tracker của Study Success Bundle",
    },
    {
      number: "03",
      title: "Academic CV Template",
      description:
        "Một bố cục sáng sủa để những môn học, dự án và trải nghiệm của bạn có chỗ đứng rõ ràng.",
      tags: ["Academic CV", "Editable file"],
      visual: "cv",
      alt: "Trang academic CV và các tờ template xếp lớp trong Study Success Bundle",
    },
    {
      number: "04",
      title: "Reflection & Review Pages",
      description:
        "Giữ lại điều đã học, điều cần đổi và bước tiếp theo — thay vì bắt đầu lại từ đầu mỗi tuần.",
      tags: ["Reflection", "Weekly review"],
      visual: "reflection",
      alt: "Các trang reflection và review trong Study Success Bundle",
    },
  ],
  marqueeTerms: [
    "Planner",
    "Weekly Dashboard",
    "Goal Map",
    "Habit Tracker",
    "Academic CV",
    "Reflection",
    "Editable Files",
    "Digital Download",
  ],
  benefits: [
    {
      number: "01",
      title: "Chọn đúng lộ trình",
      description:
        "Tách mục tiêu, ưu tiên và thời gian thật để biết mình đang đi về đâu.",
      visual: "route",
      tags: ["Direction", "Priorities"],
    },
    {
      number: "02",
      title: "Lập kế hoạch dễ làm",
      description:
        "Chuyển một học kỳ nhiều việc thành những bước nhỏ có thể nhìn thấy và bắt đầu.",
      visual: "plan",
      tags: ["Semester", "Weekly"],
    },
    {
      number: "03",
      title: "Duy trì nhịp độ",
      description:
        "Review để điều chỉnh nhịp, không phải để tự chấm điểm bản thân sau một tuần khó.",
      visual: "rhythm",
      tags: ["Review", "Habits"],
    },
    {
      number: "04",
      title: "Nộp hồ sơ tự tin",
      description:
        "Đặt những gì bạn đã làm vào một cấu trúc đủ rõ để người khác nhìn thấy.",
      visual: "profile",
      tags: ["Academic CV", "Portfolio"],
    },
  ],
  principles: [
    {
      number: "01",
      title: "Để bước tiếp theo đủ rõ",
      body:
        "Một template tốt không quyết định thay bạn. Nó làm cho việc cần làm tiếp theo hiện ra đủ gần để bắt đầu.",
      visual: "principle-route",
    },
    {
      number: "02",
      title: "Lập kế hoạch cho lịch thật",
      body:
        "Kế hoạch có giá trị khi nó chịu được một tuần bận rộn, một thay đổi bất ngờ và một lần bắt đầu lại.",
      visual: "principle-plan",
    },
    {
      number: "03",
      title: "Cho năng lực một cấu trúc",
      body:
        "Những gì bạn đã học, đã làm và đang theo đuổi xứng đáng được đặt vào một câu chuyện dễ theo dõi.",
      visual: "principle-profile",
    },
  ],
  editorialNotes: [
    {
      number: "01",
      type: "GHI CHÚ / 03 PHÚT",
      title: "Cách dùng weekly dashboard mà không bị quá tải",
      body:
        "Bắt đầu với một ưu tiên chính, giữ các việc phụ ở một vùng chờ và chỉ mở rộng khi tuần đã có nhịp.",
    },
    {
      number: "02",
      type: "GHI CHÚ / 04 PHÚT",
      title: "Biến mục tiêu học kỳ thành kế hoạch từng tuần",
      body:
        "Đi từ kết quả cần có về những mốc nhỏ, rồi chọn một mốc đủ cụ thể để đưa vào lịch thật.",
    },
    {
      number: "03",
      type: "GHI CHÚ / 03 PHÚT",
      title: "Những gì nên giữ trong một academic CV",
      body:
        "Giữ lại bối cảnh, vai trò và điều bạn đã tạo ra để người đọc hiểu câu chuyện, không chỉ nhìn thấy danh sách.",
    },
  ],
  footerLinks: [
    { label: "Trang chủ", id: "home" },
    { label: "Một hệ thống", id: "intro" },
    { label: "Bên trong bundle", id: "bundle" },
    { label: "Những cách dùng", id: "benefits" },
    { label: "Điều Temply tin", id: "principles" },
    { label: "Ghi chú học tập", id: "editorial" },
  ],
  footer: {
    line: "Templates cho những ngày học có chủ đích.",
    copyright: "Temply Studio. Nội dung và sản phẩm thuộc Temply Studio.",
  },
};

export const contactHref = runtimeConfig.contactEmail
  ? `mailto:${runtimeConfig.contactEmail}`
  : "";
