import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

// Sub-component for rendering each section with multiple items
const Section = ({ title, items }) => {
  return (
    <div className="w-full flex flex-col pb-5 1smm:pb-0 border-b 1smm:border-none border-grey-dim">
      <span className="w-full font-medium block mb-2">{title}</span>
      {items.map((item, index) => (
        <span key={index} className="w-full font-light block">
          {item}
        </span>
      ))}
    </div>
  );
};

// Sub-component for rendering a single policy with its own title and description
const PolicySection = ({ policy }) => {
  return (
    <div className="w-full flex flex-col pb-5 1smm:pb-0 border-b 1smm:border-none border-grey-dim">
      <span className="w-full font-medium block mb-2">{policy.name}</span>
      <span className="w-full font-light block">{policy.description}</span>
    </div>
  );
};

// Default data for Supabase properties
const DEFAULT_HOUSE_RULES = [
  "Check-in: 2:00 pm – 9:00 pm",
  "10 guests maximum",
  "Checkout before 12:00 pm",
];

const DEFAULT_SAFETY = [
  "No carbon monoxide alarm",
  "No smoke alarm",
  "Exterior security cameras on property",
];

const DEFAULT_CANCELLATION = [
  "Free cancellation for 48 hours. Cancel before 25 Dec for a partial refund.",
  "Review this Host's full policy for details.",
];

// Helper to format time (e.g., "14:00" -> "2:00 pm")
const formatTime = (time) => {
  if (!time) return null;
  try {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes || '00'} ${ampm}`;
  } catch {
    return time;
  }
};

// Build property-based rules (check-in, check-out, guests, etc.)
const buildPropertyRules = (houseInfo) => {
  const rules = [];

  if (houseInfo?.check_in_time) {
    rules.push(`Check-in: ${formatTime(houseInfo.check_in_time)}`);
  }

  if (houseInfo?.check_out_time) {
    rules.push(`Checkout before ${formatTime(houseInfo.check_out_time)}`);
  }

  if (houseInfo?.max_guests) {
    rules.push(`${houseInfo.max_guests} guests maximum`);
  }

  if (houseInfo?.minimum_stay && houseInfo.minimum_stay > 1) {
    rules.push(`Minimum stay: ${houseInfo.minimum_stay} nights`);
  }

  if (houseInfo?.maximum_stay) {
    rules.push(`Maximum stay: ${houseInfo.maximum_stay} nights`);
  }

  return rules;
};

const Insights = () => {
  const { id } = useParams();
  const allHouseInfo = useSelector((store) => store.houseDetail.houseInfo);
  const houseInfo = allHouseInfo?.[id] || allHouseInfo;

  const isBackendProperty = houseInfo?.isBackendProperty || false;
  const policies = houseInfo?.policies || [];

  // For backend properties: render property rules + each policy as its own section
  if (isBackendProperty) {
    const propertyRules = buildPropertyRules(houseInfo);

    return (
      <div className="w-full px-5 1smm:px-0 flex flex-col py-12">
        <span className="text-2xl block pb-6 font-medium">Things to know</span>
        <div className="w-full grid grid-cols-1 1smm:grid-cols-3 gap-x-8 gap-y-6">
          {/* Property rules section (check-in, check-out, etc.) */}
          {propertyRules.length > 0 && (
            <Section title="House rules" items={propertyRules} />
          )}

          {/* Each policy gets its own section with its name as heading */}
          {policies.map((policy, index) => (
            <PolicySection key={policy.id || index} policy={policy} />
          ))}

          {/* If no policies and no property rules, show defaults */}
          {policies.length === 0 && propertyRules.length === 0 && (
            <>
              <Section title="House rules" items={DEFAULT_HOUSE_RULES} />
              <Section title="Safety & property" items={DEFAULT_SAFETY} />
              <Section title="Cancellation policy" items={DEFAULT_CANCELLATION} />
            </>
          )}
        </div>
      </div>
    );
  }

  // For Supabase properties: use default sections
  return (
    <div className="w-full px-5 1smm:px-0 flex flex-col py-12">
      <span className="text-2xl block pb-6 font-medium">Things to know</span>
      <div className="w-full grid grid-cols-1 1smm:grid-cols-3 gap-x-8 gap-y-6">
        <Section title="House rules" items={DEFAULT_HOUSE_RULES} />
        <Section title="Safety & property" items={DEFAULT_SAFETY} />
        <Section title="Cancellation policy" items={DEFAULT_CANCELLATION} />
      </div>
    </div>
  );
};

export default Insights;
