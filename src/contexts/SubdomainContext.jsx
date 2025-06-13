// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { checkSubdomain } from "../api/subdomain";

// export const SubdomainContext = createContext();

// export const SubdomainProvider = ({ children }) => {
//   const [isValidSubdomain, setIsValidSubdomain] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const validateSubdomain = async () => {
//       try {
//         // Extract subdomain from window location
//         const subdomain = window.location.hostname;
//         const result = await checkSubdomain(subdomain);

//         if (!result.success) {
//           navigate("/error", {
//             state: {
//               error: {
//                 status: result.status || 400,
//                 message: result.message || "Invalid subdomain",
//                 title: "Subdomain Error",
//               },
//             },
//             replace: true,
//           });
//           return;
//         }

//         setIsValidSubdomain(true);
//       } catch (error) {
//         navigate("/error", {
//           state: {
//             error: {
//               status: 500,
//               message: "Failed to validate subdomain",
//               title: "Validation Error",
//             },
//           },
//           replace: true,
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     validateSubdomain();
//   }, [navigate]);

//   return (
//     <SubdomainContext.Provider value={{ isValidSubdomain, isLoading }}>
//       {children}
//     </SubdomainContext.Provider>
//   );
// };

// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { checkSubdomain } from "../api/subdomain";

// export const SubdomainContext = createContext();

// export const SubdomainProvider = ({ children }) => {
//   const [isValidSubdomain, setIsValidSubdomain] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const validateSubdomain = async () => {
//       try {
//         // Extract subdomain from URL (e.g., "abc.example.com" → "abc")
//         const fullDomain = window.location.hostname;
//         const subdomain = fullDomain.split(".")[0]; // Split and take the first part

//         // Skip validation if on localhost/main domain
//         if (fullDomain === "localhost" || !fullDomain.includes(".")) {
//           setIsValidSubdomain(true);
//           setIsLoading(false);
//           return;
//         }

//         const result = await checkSubdomain(subdomain);

//         if (!result.success) {
//           navigate("/error", {
//             state: {
//               error: {
//                 status: result.status || 400,
//                 message: result.message || "Invalid subdomain",
//                 title: "Subdomain Error",
//               },
//             },
//             replace: true, // Prevents back navigation to invalid subdomain
//           });
//           return;
//         }

//         setIsValidSubdomain(true);
//       } catch (error) {
//         navigate("/error", {
//           state: {
//             error: {
//               status: 500,
//               message: "Network error during validation",
//               title: "Server Error",
//             },
//           },
//           replace: true,
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     validateSubdomain();
//   }, [navigate]);

//   return (
//     <SubdomainContext.Provider value={{ isValidSubdomain, isLoading }}>
//       {isLoading ? <div>Loading subdomain...</div> : children}
//     </SubdomainContext.Provider>
//   );
// };
