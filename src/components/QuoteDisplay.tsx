import React from 'react';

const quotes = [
  "Every drop of blood you donate is a gift of life.",
  "Be the reason for someone's heartbeat.",
  "Your blood donation can give a precious smile to someone's face.",
  "A single pint can save three lives, a single gesture can create a million smiles.",
  "The gift of blood is the gift of life.",
  "Blood donation will cost you nothing but it will save a life!",
  "Heroes come in all types, and all blood types.",
];

export function QuoteDisplay() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 relative overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {quotes.map((quote, index) => (
          <span key={index} className="mx-8 inline-block">
            ❤️ {quote}
          </span>
        ))}
      </div>
    </div>
  );
}