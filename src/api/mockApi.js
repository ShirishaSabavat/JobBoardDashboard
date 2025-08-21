// Mock API service to simulate Arbeitnow API
const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp GmbH",
    location: "Berlin, Germany",
    remote: true,
    job_type: "Full-time",
    description: "<p>We are looking for a Senior Frontend Developer to join our team in Berlin. You will be responsible for building scalable web applications using React, TypeScript, and modern frontend technologies.</p><h3>Requirements:</h3><ul><li>5+ years of experience with React</li><li>Strong TypeScript skills</li><li>Experience with modern CSS frameworks</li><li>Knowledge of testing frameworks</li></ul>",
    tags: ["React", "TypeScript", "JavaScript", "CSS", "Testing"],
    url: "https://example.com/job/1",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "StartupXYZ",
    location: "Munich, Germany",
    remote: false,
    job_type: "Full-time",
    description: "<p>Join our fast-growing startup as a Backend Engineer. You'll work on building robust APIs and microservices using Node.js and Python.</p><h3>What you'll do:</h3><ul><li>Design and implement RESTful APIs</li><li>Work with databases (PostgreSQL, MongoDB)</li><li>Deploy and maintain cloud infrastructure</li><li>Collaborate with frontend and mobile teams</li></ul>",
    tags: ["Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
    url: "https://example.com/job/2",
    created_at: "2024-01-14T14:30:00Z"
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Enterprise Solutions",
    location: "Hamburg, Germany",
    remote: true,
    job_type: "Full-time",
    description: "<p>We're seeking a DevOps Engineer to help us scale our infrastructure and improve our deployment processes.</p><h3>Key responsibilities:</h3><ul><li>Manage Kubernetes clusters</li><li>Implement CI/CD pipelines</li><li>Monitor system performance</li><li>Ensure security best practices</li></ul>",
    tags: ["Kubernetes", "Docker", "Jenkins", "AWS", "Monitoring"],
    url: "https://example.com/job/3",
    created_at: "2024-01-13T09:15:00Z"
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "AI Innovations",
    location: "Frankfurt, Germany",
    remote: true,
    job_type: "Full-time",
    description: "<p>Join our AI team to develop machine learning models and data-driven solutions.</p><h3>Requirements:</h3><ul><li>MSc/PhD in Computer Science or related field</li><li>Experience with Python, TensorFlow, PyTorch</li><li>Strong statistical background</li><li>Experience with big data technologies</li></ul>",
    tags: ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"],
    url: "https://example.com/job/4",
    created_at: "2024-01-12T16:45:00Z"
  },
  {
    id: 5,
    title: "Product Manager",
    company: "Digital Ventures",
    location: "Cologne, Germany",
    remote: false,
    job_type: "Full-time",
    description: "<p>Lead product development for our digital platform. Work closely with engineering, design, and business teams.</p><h3>What you'll do:</h3><ul><li>Define product strategy and roadmap</li><li>Gather and prioritize requirements</li><li>Work with cross-functional teams</li><li>Analyze user feedback and metrics</li></ul>",
    tags: ["Product Management", "Agile", "User Research", "Analytics", "Strategy"],
    url: "https://example.com/job/5",
    created_at: "2024-01-11T11:20:00Z"
  },
  {
    id: 6,
    title: "UX/UI Designer",
    company: "Creative Studio",
    location: "Düsseldorf, Germany",
    remote: true,
    job_type: "Part-time",
    description: "<p>Create beautiful and intuitive user experiences for our digital products.</p><h3>Skills needed:</h3><ul><li>Proficiency in Figma, Sketch, or Adobe XD</li><li>Understanding of user-centered design</li><li>Experience with design systems</li><li>Knowledge of accessibility standards</li></ul>",
    tags: ["Figma", "UX Design", "UI Design", "Prototyping", "Accessibility"],
    url: "https://example.com/job/6",
    created_at: "2024-01-10T13:10:00Z"
  },
  {
    id: 7,
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    location: "Stuttgart, Germany",
    remote: false,
    job_type: "Full-time",
    description: "<p>Build native iOS applications using Swift and SwiftUI.</p><h3>Requirements:</h3><ul><li>3+ years of iOS development experience</li><li>Proficiency in Swift and SwiftUI</li><li>Experience with Core Data and networking</li><li>Knowledge of App Store guidelines</li></ul>",
    tags: ["Swift", "iOS", "SwiftUI", "Core Data", "Xcode"],
    url: "https://example.com/job/7",
    created_at: "2024-01-09T08:30:00Z"
  },
  {
    id: 8,
    title: "QA Engineer",
    company: "Quality First",
    location: "Leipzig, Germany",
    remote: true,
    job_type: "Full-time",
    description: "<p>Ensure the quality of our software products through comprehensive testing strategies.</p><h3>Responsibilities:</h3><ul><li>Design and execute test plans</li><li>Automate testing processes</li><li>Perform manual and automated testing</li><li>Report and track bugs</li></ul>",
    tags: ["Testing", "Automation", "Selenium", "Jest", "Quality Assurance"],
    url: "https://example.com/job/8",
    created_at: "2024-01-08T15:45:00Z"
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const mockApi = {
  // Get jobs with pagination and filters
  async getJobs({ page = 1, limit = 20, search = '', filters = {} }) {
    await delay(800); // Simulate network delay
    
    let filteredJobs = [...mockJobs];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply remote filter
    if (filters.remote !== undefined) {
      filteredJobs = filteredJobs.filter(job => job.remote === filters.remote);
    }
    
    // Apply location filter
    if (filters.location) {
      const locationLower = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(locationLower)
      );
    }
    
    // Apply tags filter
    if (filters.tags && filters.tags.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.tags.some(tag => job.tags.includes(tag))
      );
    }
    
    // Apply job type filter
    if (filters.jobType) {
      filteredJobs = filteredJobs.filter(job => job.job_type === filters.jobType);
    }
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
    
    // Calculate meta information
    const total = filteredJobs.length;
    const lastPage = Math.ceil(total / limit);
    
    return {
      data: paginatedJobs,
      meta: {
        current_page: page,
        last_page: lastPage,
        per_page: limit,
        total: total,
        from: startIndex + 1,
        to: Math.min(endIndex, total)
      }
    };
  },
  
  // Get single job by ID
  async getJobById(id) {
    await delay(500);
    
    const job = mockJobs.find(job => job.id === parseInt(id));
    
    if (!job) {
      throw new Error('Job not found');
    }
    
    return {
      data: job
    };
  }
};

export default mockApi;
