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
    imagePath: "/src/assets/optimized/temply-study-bundle-hero-1280.webp",
  },
  navItems: [
    { number: "01", label: "Trang chủ", id: "home" },
    { number: "02", label: "Bên trong bundle", id: "bundle" },
    { number: "03", label: "Lợi ích", id: "benefits" },
    { number: "04", label: "Cách sử dụng", id: "how" },
    { number: "05", label: "FAQ", id: "faq" },
    { number: "06", label: "Nhận bundle", id: "checkout" },
  ],
  hero: {
    label: "Temply Studio / Study Success Bundle",
    title: ["Học có định hướng.", "Làm hồ sơ có dấu ấn."],
    description:
      "Một bộ template số gọn gàng để bạn lên kế hoạch học tập, theo dõi mục tiêu và trình bày năng lực theo cách của riêng mình.",
    microcopy: "File chỉnh sửa được · Dùng theo nhịp của bạn",
  },
  statement: {
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
      tags: ["Planner", "Editable file"],
      visual: "planner",
    },
    {
      number: "02",
      title: "Goal Map & Habit Tracker",
      description:
        "Biến mục tiêu lớn thành những dấu mốc nhỏ, có thể xem lại mà không tự gây áp lực.",
      tags: ["Goal map", "Tracker"],
      visual: "goals",
    },
    {
      number: "03",
      title: "Academic CV Template",
      description:
        "Một bố cục sáng sủa để những môn học, dự án và trải nghiệm của bạn có chỗ đứng rõ ràng.",
      tags: ["Academic CV", "Editable template"],
      visual: "cv",
    },
    {
      number: "04",
      title: "Reflection & Review Pages",
      description:
        "Giữ lại điều đã học, điều cần đổi và bước tiếp theo — thay vì bắt đầu lại từ đầu mỗi tuần.",
      tags: ["Reflection", "Weekly review"],
      visual: "reflection",
    },
  ],
  benefits: [
    {
      number: "01",
      title: "Chọn đúng lộ trình",
      description:
        "Tách mục tiêu, ưu tiên và thời gian thật để biết mình đang đi về đâu.",
      visual: "route",
    },
    {
      number: "02",
      title: "Lập kế hoạch dễ làm",
      description:
        "Chuyển một học kỳ nhiều việc thành những bước nhỏ có thể nhìn thấy và bắt đầu.",
      visual: "plan",
    },
    {
      number: "03",
      title: "Duy trì nhịp độ",
      description:
        "Review để điều chỉnh nhịp, không phải để tự chấm điểm bản thân sau một tuần khó.",
      visual: "rhythm",
    },
    {
      number: "04",
      title: "Nộp hồ sơ tự tin",
      description:
        "Đặt những gì bạn đã làm vào một cấu trúc đủ rõ để người khác nhìn thấy.",
      visual: "profile",
    },
  ],
  steps: [
    {
      number: "01",
      title: "Nhận file",
      description: "Mở bộ file sau khi quy trình mua hàng của nhà cung cấp hoàn tất.",
      visual: "receive",
    },
    {
      number: "02",
      title: "Chọn mẫu phù hợp",
      description: "Bắt đầu với planner, tracker, CV hoặc trang review đúng với việc trước mắt.",
      visual: "choose",
    },
    {
      number: "03",
      title: "Cá nhân hoá nội dung",
      description: "Thay nội dung, màu sắc và chi tiết để template trở thành hệ thống của bạn.",
      visual: "customize",
    },
    {
      number: "04",
      title: "Dùng theo nhịp của bạn",
      description: "Giữ một nhịp làm việc thực tế, xem lại và điều chỉnh khi lịch học thay đổi.",
      visual: "use",
    },
  ],
  proofItems: [
    {
      number: "01",
      title: "File số có thể chỉnh sửa",
      body: "Bạn bắt đầu từ cấu trúc có sẵn và thêm nội dung của chính mình.",
    },
    {
      number: "02",
      title: "Các trang có chức năng rõ",
      body: "Planner, tracker, CV và review cùng nằm trong một mạch sử dụng.",
    },
    {
      number: "03",
      title: "Một lần mua cho một bộ file",
      body: "Giá hiện tại của Study Success Bundle là $12, trước khi có các điều kiện khác từ checkout.",
    },
  ],
  faqItems: [
    {
      question: "Bundle này dành cho ai?",
      answer:
        "Dành cho sinh viên, người tự học và bất kỳ ai muốn sắp xếp việc học, dự án hoặc hồ sơ theo một cấu trúc rõ ràng hơn.",
    },
    {
      question: "Tôi nhận file như thế nào?",
      answer: runtimeConfig.checkoutUrl
        ? "Sau khi thanh toán qua liên kết checkout được cấu hình, cách nhận file sẽ phụ thuộc vào quy trình của nhà cung cấp. Hãy kiểm tra phần hướng dẫn trên trang thanh toán trước khi hoàn tất."
        : "Liên kết checkout và quy trình giao file chưa được cấu hình trong bản preview này. Trang không ghi nhận thanh toán hoặc gửi email tải xuống.",
    },
    {
      question: "Tôi có cần biết thiết kế không?",
      answer:
        "Không. Các mẫu bắt đầu từ bố cục có sẵn; bạn có thể thay nội dung và điều chỉnh những chi tiết phù hợp với cách học của mình.",
    },
    {
      question: "Có thể dùng trên điện thoại không?",
      answer:
        "Bạn có thể xem hoặc chỉnh sửa trên điện thoại, tablet hoặc máy tính nếu ứng dụng bạn dùng hỗ trợ loại file tương ứng. Trải nghiệm chỉnh sửa đầy đủ nhất thường là trên laptop hoặc desktop.",
    },
  ],
  footerLinks: [
    { label: "Trang chủ", id: "home" },
    { label: "Bên trong bundle", id: "bundle" },
    { label: "Lợi ích", id: "benefits" },
    { label: "Cách sử dụng", id: "how" },
    { label: "FAQ", id: "faq" },
  ],
};

export const contactHref = runtimeConfig.contactEmail
  ? `mailto:${runtimeConfig.contactEmail}`
  : "";
