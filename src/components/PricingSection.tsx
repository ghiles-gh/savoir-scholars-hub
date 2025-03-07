
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small schools with up to 100 students",
      features: [
        "Up to 10 teachers",
        "Up to 100 students",
        "Basic report templates",
        "Email notifications",
        "30-day report history"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$249",
      period: "per month",
      description: "Ideal for medium-sized schools with advanced needs",
      features: [
        "Up to 50 teachers",
        "Up to 500 students",
        "Advanced report templates",
        "Email & push notifications",
        "1-year report history",
        "Performance analytics",
        "Priority support"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large schools with custom requirements",
      features: [
        "Unlimited teachers",
        "Unlimited students",
        "Custom report templates",
        "All notification channels",
        "Unlimited report history",
        "Advanced analytics & API",
        "Dedicated support",
        "White-labeling options"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title text-center">Pricing Plans</h2>
        <p className="section-subtitle text-center mx-auto">
          Choose the plan that fits your school's needs and budget
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-lg border ${plan.popular ? 'border-nobel-gold shadow-lg' : 'border-gray-200'} overflow-hidden`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-nobel-gold text-nobel-navy px-3 py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-nobel-navy">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-nobel-blue">{plan.price}</span>
                  <span className="ml-1 text-gray-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-nobel-gold text-nobel-navy hover:bg-nobel-gold/90' : 'bg-nobel-blue hover:bg-nobel-blue/90'}`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <Button variant="outline" className="border-nobel-blue text-nobel-blue hover:bg-nobel-blue/10">
            Compare All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
