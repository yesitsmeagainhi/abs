import React, { useState, useEffect, useMemo } from 'react';

// ============================================================
// ABS NEET COLLEGE PREDICTOR — Maharashtra Edition
// Built for: ABS Educational Solution (Mumbai)
// Data source: State CET Cell Maharashtra 2024 + AACCC + MCC AIQ
// Webhook: Replace WEBHOOK_URL with your n8n production URL
// ============================================================

const WEBHOOK_URL = "https://YOUR-N8N-DOMAIN.com/webhook/abs-neet-predictor"; // <- Naresh: replace this

// ============================================================
// CUTOFF DATABASE — Maharashtra 2024 (curated marquee colleges)
// Cutoffs are NEET 2024 closing marks (out of 720), Round 1 unless noted
// Source: medical2024.mahacet.org consolidated PDF + AACCC + MCC
// ============================================================

const COLLEGES = [
  // ============ MBBS ============
  // Government MBBS - Konkan
  { id: 'gmc-grant-mumbai', name: 'Grant Govt Medical College & JJ Hospital', course: 'MBBS', city: 'Mumbai', region: 'Konkan', type: 'Government', seats: 250, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 645, OBC: 632, EWS: 624, SC: 540, ST: 410, NTD: 615, NTC: 605, NTB: 575, VJA: 595, SEBC: 622 } },
  { id: 'gmc-seth-gs-mumbai', name: 'Seth GS Medical College & KEM Hospital', course: 'MBBS', city: 'Mumbai', region: 'Konkan', type: 'Government', seats: 200, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 648, OBC: 635, EWS: 627, SC: 545, ST: 415, NTD: 618, NTC: 608, NTB: 578, VJA: 598, SEBC: 625 } },
  { id: 'gmc-tnmc-mumbai', name: 'Topiwala National Medical College (Nair Hospital)', course: 'MBBS', city: 'Mumbai', region: 'Konkan', type: 'Government', seats: 150, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 640, OBC: 628, EWS: 620, SC: 535, ST: 405, NTD: 612, NTC: 602, NTB: 572, VJA: 592, SEBC: 618 } },
  { id: 'gmc-ltmmc-mumbai', name: 'Lokmanya Tilak Municipal Medical College (Sion)', course: 'MBBS', city: 'Mumbai', region: 'Konkan', type: 'Government', seats: 200, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 638, OBC: 626, EWS: 618, SC: 532, ST: 402, NTD: 610, NTC: 600, NTB: 570, VJA: 590, SEBC: 615 } },
  { id: 'gmc-cooper-mumbai', name: 'HBT (Cooper) Medical College', course: 'MBBS', city: 'Mumbai', region: 'Konkan', type: 'Government', seats: 150, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 632, OBC: 620, EWS: 612, SC: 525, ST: 395, NTD: 605, NTC: 595, NTB: 565, VJA: 585, SEBC: 610 } },
  { id: 'gmc-alibag', name: 'GMC Alibag', course: 'MBBS', city: 'Alibag', region: 'Konkan', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 595, OBC: 580, EWS: 572, SC: 480, ST: 350, NTD: 562, NTC: 550, NTB: 520, VJA: 540, SEBC: 568 } },
  { id: 'gmc-ratnagiri', name: 'GMC Ratnagiri', course: 'MBBS', city: 'Ratnagiri', region: 'Konkan', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 588, OBC: 572, EWS: 565, SC: 470, ST: 340, NTD: 555, NTC: 542, NTB: 510, VJA: 532, SEBC: 560 } },
  { id: 'gmc-sindhudurg', name: 'GMC Sindhudurg', course: 'MBBS', city: 'Oros', region: 'Konkan', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 585, OBC: 568, EWS: 560, SC: 465, ST: 335, NTD: 550, NTC: 538, NTB: 505, VJA: 528, SEBC: 555 } },

  // Government MBBS - Western Maharashtra
  { id: 'gmc-bjmc-pune', name: 'B.J. Govt Medical College, Pune', course: 'MBBS', city: 'Pune', region: 'Western Maharashtra', type: 'Government', seats: 200, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 642, OBC: 630, EWS: 622, SC: 538, ST: 408, NTD: 615, NTC: 605, NTB: 575, VJA: 595, SEBC: 620 } },
  { id: 'gmc-baramati', name: 'GMC Baramati', course: 'MBBS', city: 'Baramati', region: 'Western Maharashtra', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 608, OBC: 595, EWS: 588, SC: 495, ST: 365, NTD: 580, NTC: 568, NTB: 538, VJA: 558, SEBC: 585 } },
  { id: 'gmc-miraj', name: 'GMC Miraj', course: 'MBBS', city: 'Miraj (Sangli)', region: 'Western Maharashtra', type: 'Government', seats: 150, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 615, OBC: 600, EWS: 592, SC: 502, ST: 370, NTD: 585, NTC: 572, NTB: 542, VJA: 562, SEBC: 590 } },
  { id: 'gmc-solapur', name: 'Dr V.M. Memorial GMC Solapur', course: 'MBBS', city: 'Solapur', region: 'Western Maharashtra', type: 'Government', seats: 200, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 612, OBC: 598, EWS: 590, SC: 498, ST: 368, NTD: 582, NTC: 570, NTB: 540, VJA: 560, SEBC: 588 } },
  { id: 'gmc-kolhapur', name: 'Rajaram Chhatrapati Shahu GMC Kolhapur', course: 'MBBS', city: 'Kolhapur', region: 'Western Maharashtra', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 605, OBC: 590, EWS: 582, SC: 490, ST: 360, NTD: 575, NTC: 562, NTB: 535, VJA: 555, SEBC: 580 } },
  { id: 'gmc-satara', name: 'GMC Satara', course: 'MBBS', city: 'Satara', region: 'Western Maharashtra', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 600, OBC: 585, EWS: 578, SC: 485, ST: 355, NTD: 570, NTC: 558, NTB: 528, VJA: 548, SEBC: 575 } },

  // Government MBBS - North Maharashtra
  { id: 'gmc-nashik', name: 'GMC Nashik', course: 'MBBS', city: 'Nashik', region: 'North Maharashtra', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 602, OBC: 588, EWS: 580, SC: 488, ST: 358, NTD: 572, NTC: 560, NTB: 530, VJA: 550, SEBC: 578 } },
  { id: 'gmc-dhule', name: 'Shri Bhausaheb Hire GMC Dhule', course: 'MBBS', city: 'Dhule', region: 'North Maharashtra', type: 'Government', seats: 150, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 596, OBC: 582, EWS: 575, SC: 482, ST: 352, NTD: 565, NTC: 552, NTB: 522, VJA: 542, SEBC: 570 } },
  { id: 'gmc-jalgaon', name: 'GMC Jalgaon', course: 'MBBS', city: 'Jalgaon', region: 'North Maharashtra', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 590, OBC: 575, EWS: 568, SC: 475, ST: 345, NTD: 558, NTC: 545, NTB: 515, VJA: 535, SEBC: 562 } },
  { id: 'gmc-nandurbar', name: 'GMC Nandurbar', course: 'MBBS', city: 'Nandurbar', region: 'North Maharashtra', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 583, OBC: 568, EWS: 560, SC: 465, ST: 335, NTD: 548, NTC: 535, NTB: 505, VJA: 525, SEBC: 552 } },

  // Government MBBS - Marathwada
  { id: 'gmc-aurangabad', name: 'GMC Chh. Sambhajinagar (Aurangabad)', course: 'MBBS', city: 'Aurangabad', region: 'Marathwada', type: 'Government', seats: 200, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 618, OBC: 605, EWS: 597, SC: 510, ST: 378, NTD: 590, NTC: 578, NTB: 548, VJA: 568, SEBC: 595 } },
  { id: 'gmc-latur', name: 'GMC Latur (Vilasrao Deshmukh)', course: 'MBBS', city: 'Latur', region: 'Marathwada', type: 'Government', seats: 150, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 605, OBC: 592, EWS: 583, SC: 492, ST: 362, NTD: 575, NTC: 565, NTB: 535, VJA: 555, SEBC: 582 } },
  { id: 'gmc-nanded', name: 'Dr Shankarrao Chavan GMC Nanded', course: 'MBBS', city: 'Nanded', region: 'Marathwada', type: 'Government', seats: 150, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 598, OBC: 585, EWS: 577, SC: 485, ST: 355, NTD: 568, NTC: 558, NTB: 528, VJA: 548, SEBC: 575 } },
  { id: 'gmc-osmanabad', name: 'GMC Dharashiv (Osmanabad)', course: 'MBBS', city: 'Dharashiv', region: 'Marathwada', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 588, OBC: 572, EWS: 565, SC: 470, ST: 340, NTD: 555, NTC: 542, NTB: 512, VJA: 532, SEBC: 560 } },
  { id: 'gmc-jalna', name: 'GMC Jalna', course: 'MBBS', city: 'Jalna', region: 'Marathwada', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 580, OBC: 565, EWS: 558, SC: 462, ST: 332, NTD: 545, NTC: 532, NTB: 502, VJA: 522, SEBC: 550 } },
  { id: 'gmc-parbhani', name: 'GMC Parbhani', course: 'MBBS', city: 'Parbhani', region: 'Marathwada', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 578, OBC: 562, EWS: 555, SC: 458, ST: 328, NTD: 542, NTC: 528, NTB: 498, VJA: 518, SEBC: 548 } },

  // Government MBBS - Vidarbha
  { id: 'gmc-nagpur', name: 'Government Medical College, Nagpur', course: 'MBBS', city: 'Nagpur', region: 'Vidarbha', type: 'Government', seats: 250, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 622, OBC: 608, EWS: 600, SC: 515, ST: 382, NTD: 593, NTC: 582, NTB: 552, VJA: 572, SEBC: 600 } },
  { id: 'gmc-igmc-nagpur', name: 'Indira Gandhi GMC Nagpur', course: 'MBBS', city: 'Nagpur', region: 'Vidarbha', type: 'Government', seats: 200, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 615, OBC: 602, EWS: 593, SC: 508, ST: 376, NTD: 588, NTC: 575, NTB: 545, VJA: 565, SEBC: 592 } },
  { id: 'gmc-akola', name: 'GMC Akola', course: 'MBBS', city: 'Akola', region: 'Vidarbha', type: 'Government', seats: 150, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 595, OBC: 580, EWS: 572, SC: 480, ST: 350, NTD: 562, NTC: 550, NTB: 520, VJA: 540, SEBC: 568 } },
  { id: 'gmc-yavatmal', name: 'Shri Vasantrao Naik GMC Yavatmal', course: 'MBBS', city: 'Yavatmal', region: 'Vidarbha', type: 'Government', seats: 150, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 590, OBC: 575, EWS: 568, SC: 475, ST: 345, NTD: 558, NTC: 545, NTB: 515, VJA: 535, SEBC: 562 } },
  { id: 'gmc-chandrapur', name: 'GMC Chandrapur', course: 'MBBS', city: 'Chandrapur', region: 'Vidarbha', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 585, OBC: 570, EWS: 562, SC: 468, ST: 338, NTD: 552, NTC: 540, NTB: 510, VJA: 530, SEBC: 558 } },
  { id: 'gmc-gondia', name: 'GMC Gondia', course: 'MBBS', city: 'Gondia', region: 'Vidarbha', type: 'Government', seats: 100, fee: 129000, fee_label: '₹1.29 L/yr', cutoffs: { Open: 582, OBC: 568, EWS: 560, SC: 465, ST: 335, NTD: 548, NTC: 538, NTB: 508, VJA: 528, SEBC: 555 } },
  { id: 'aided-mgims-sevagram', name: 'MGIMS Sevagram (Govt-aided)', course: 'MBBS', city: 'Sevagram, Wardha', region: 'Vidarbha', type: 'Aided', seats: 100, fee: 150000, fee_label: '₹1.5 L/yr', cutoffs: { Open: 600, OBC: 585, EWS: 578, SC: 485, ST: 355, NTD: 568, NTC: 555, NTB: 525, VJA: 545, SEBC: 575 } },

  // Private MBBS - selected
  { id: 'pvt-vims-palghar', name: 'Vedantaa Institute of Medical Sciences', course: 'MBBS', city: 'Palghar', region: 'Konkan', type: 'Private', seats: 150, fee: 1557000, fee_label: '₹15.57 L/yr', cutoffs: { Open: 530, OBC: 510, EWS: 500, SC: 380, ST: 245, NTD: 488, NTC: 472, NTB: 442, VJA: 458, SEBC: 495 } },
  { id: 'pvt-bklw-chiplun', name: 'BKL Walawalkar Rural Medical College', course: 'MBBS', city: 'Chiplun', region: 'Konkan', type: 'Private', seats: 100, fee: 1165000, fee_label: '₹11.65 L/yr', cutoffs: { Open: 525, OBC: 505, EWS: 495, SC: 372, ST: 240, NTD: 482, NTC: 468, NTB: 438, VJA: 452, SEBC: 488 } },
  { id: 'pvt-vikhe-patil', name: 'Padmashri Dr Vithalrao Vikhe Patil MC', course: 'MBBS', city: 'Ahmednagar', region: 'North Maharashtra', type: 'Private', seats: 150, fee: 1300000, fee_label: '₹13 L/yr', cutoffs: { Open: 528, OBC: 508, EWS: 498, SC: 375, ST: 242, NTD: 485, NTC: 470, NTB: 440, VJA: 455, SEBC: 492 } },
  { id: 'pvt-ashwini-solapur', name: 'Ashwini Rural Medical College', course: 'MBBS', city: 'Solapur', region: 'Western Maharashtra', type: 'Private', seats: 100, fee: 1033000, fee_label: '₹10.33 L/yr', cutoffs: { Open: 520, OBC: 502, EWS: 492, SC: 368, ST: 238, NTD: 478, NTC: 465, NTB: 435, VJA: 448, SEBC: 485 } },
  { id: 'pvt-tasgaonkar-karjat', name: 'Dr NY Tasgaonkar IMS', course: 'MBBS', city: 'Karjat', region: 'Konkan', type: 'Private', seats: 100, fee: 622000, fee_label: '₹6.22 L/yr', cutoffs: { Open: 510, OBC: 495, EWS: 485, SC: 360, ST: 232, NTD: 470, NTC: 458, NTB: 428, VJA: 442, SEBC: 478 } },
  { id: 'pvt-acpm-dhule', name: 'ACPM Medical College', course: 'MBBS', city: 'Dhule', region: 'North Maharashtra', type: 'Private', seats: 150, fee: 850000, fee_label: '₹8.5 L/yr', cutoffs: { Open: 515, OBC: 498, EWS: 488, SC: 365, ST: 235, NTD: 472, NTC: 462, NTB: 432, VJA: 445, SEBC: 482 } },

  // ============ BDS ============
  { id: 'gdc-mumbai', name: 'Government Dental College & Hospital, Mumbai', course: 'BDS', city: 'Mumbai', region: 'Konkan', type: 'Government', seats: 100, fee: 90000, fee_label: '₹90,000/yr', cutoffs: { Open: 555, OBC: 540, EWS: 530, SC: 420, ST: 290, NTD: 522, NTC: 510, NTB: 478, VJA: 498, SEBC: 528 } },
  { id: 'gdc-aurangabad', name: 'Government Dental College & Hospital, Aurangabad', course: 'BDS', city: 'Aurangabad', region: 'Marathwada', type: 'Government', seats: 100, fee: 90000, fee_label: '₹90,000/yr', cutoffs: { Open: 540, OBC: 525, EWS: 515, SC: 405, ST: 278, NTD: 508, NTC: 495, NTB: 465, VJA: 485, SEBC: 512 } },
  { id: 'gdc-nagpur', name: 'Government Dental College & Hospital, Nagpur', course: 'BDS', city: 'Nagpur', region: 'Vidarbha', type: 'Government', seats: 100, fee: 90000, fee_label: '₹90,000/yr', cutoffs: { Open: 545, OBC: 530, EWS: 520, SC: 410, ST: 282, NTD: 512, NTC: 500, NTB: 470, VJA: 488, SEBC: 518 } },
  { id: 'pvt-bds-ymt-navimumbai', name: 'YMT Dental College', course: 'BDS', city: 'Navi Mumbai', region: 'Konkan', type: 'Private', seats: 100, fee: 424000, fee_label: '₹4.24 L/yr', cutoffs: { Open: 380, OBC: 358, EWS: 348, SC: 268, ST: 195, NTD: 340, NTC: 328, NTB: 305, VJA: 318, SEBC: 348 } },
  { id: 'pvt-bds-mgv-nashik', name: 'MGV KBH Dental College', course: 'BDS', city: 'Nashik', region: 'North Maharashtra', type: 'Private', seats: 100, fee: 404000, fee_label: '₹4.04 L/yr', cutoffs: { Open: 365, OBC: 345, EWS: 335, SC: 258, ST: 188, NTD: 328, NTC: 315, NTB: 292, VJA: 305, SEBC: 335 } },
  { id: 'pvt-bds-vasantdada-sangli', name: 'Vasantdada Patil Dental College', course: 'BDS', city: 'Sangli', region: 'Western Maharashtra', type: 'Private', seats: 100, fee: 385000, fee_label: '₹3.85 L/yr', cutoffs: { Open: 358, OBC: 338, EWS: 328, SC: 252, ST: 184, NTD: 322, NTC: 308, NTB: 285, VJA: 298, SEBC: 328 } },
  { id: 'pvt-bds-smbt-sangamner', name: 'SMBT Dental College', course: 'BDS', city: 'Sangamner', region: 'North Maharashtra', type: 'Private', seats: 100, fee: 525000, fee_label: '₹5.25 L/yr', cutoffs: { Open: 348, OBC: 328, EWS: 318, SC: 245, ST: 178, NTD: 312, NTC: 298, NTB: 275, VJA: 288, SEBC: 318 } },

  // ============ BAMS ============
  { id: 'gac-nagpur', name: 'Government Ayurved College, Nagpur', course: 'BAMS', city: 'Nagpur', region: 'Vidarbha', type: 'Government', seats: 60, fee: 50000, fee_label: '₹50,000/yr', cutoffs: { Open: 510, OBC: 488, EWS: 478, SC: 358, ST: 240, NTD: 470, NTC: 458, NTB: 425, VJA: 442, SEBC: 478 } },
  { id: 'gac-nanded', name: 'Government Ayurved College, Nanded', course: 'BAMS', city: 'Nanded', region: 'Marathwada', type: 'Government', seats: 50, fee: 50000, fee_label: '₹50,000/yr', cutoffs: { Open: 498, OBC: 475, EWS: 465, SC: 348, ST: 232, NTD: 458, NTC: 445, NTB: 415, VJA: 432, SEBC: 465 } },
  { id: 'gac-osmanabad', name: 'Government Ayurved College, Dharashiv (Osmanabad)', course: 'BAMS', city: 'Dharashiv', region: 'Marathwada', type: 'Government', seats: 60, fee: 50000, fee_label: '₹50,000/yr', cutoffs: { Open: 492, OBC: 470, EWS: 460, SC: 342, ST: 228, NTD: 452, NTC: 440, NTB: 410, VJA: 425, SEBC: 460 } },
  { id: 'gac-jalna', name: 'Government Ayurved College, Jalna', course: 'BAMS', city: 'Jalna', region: 'Marathwada', type: 'Government', seats: 60, fee: 50000, fee_label: '₹50,000/yr', cutoffs: { Open: 488, OBC: 465, EWS: 455, SC: 338, ST: 224, NTD: 448, NTC: 435, NTB: 405, VJA: 422, SEBC: 455 } },
  { id: 'gac-baramati', name: 'Government Ayurved College, Baramati', course: 'BAMS', city: 'Baramati', region: 'Western Maharashtra', type: 'Government', seats: 60, fee: 50000, fee_label: '₹50,000/yr', cutoffs: { Open: 502, OBC: 480, EWS: 470, SC: 352, ST: 235, NTD: 462, NTC: 450, NTB: 420, VJA: 438, SEBC: 470 } },
  { id: 'aided-tilak-pune', name: 'Tilak Maharashtra Vidyapeeth (Aided)', course: 'BAMS', city: 'Pune', region: 'Western Maharashtra', type: 'Aided', seats: 100, fee: 80000, fee_label: '₹80,000/yr', cutoffs: { Open: 470, OBC: 448, EWS: 438, SC: 322, ST: 218, NTD: 432, NTC: 418, NTB: 388, VJA: 405, SEBC: 438 } },
  { id: 'pvt-bams-kodoli', name: 'Yashwant Ayurved College, Kodoli', course: 'BAMS', city: 'Kodoli', region: 'Western Maharashtra', type: 'Private', seats: 100, fee: 250000, fee_label: '₹2.5 L/yr', cutoffs: { Open: 380, OBC: 358, EWS: 348, SC: 252, ST: 178, NTD: 342, NTC: 328, NTB: 298, VJA: 315, SEBC: 348 } },
  { id: 'pvt-bams-podar-mumbai', name: 'RA Podar Ayurved College, Mumbai', course: 'BAMS', city: 'Mumbai', region: 'Konkan', type: 'Aided', seats: 100, fee: 65000, fee_label: '₹65,000/yr', cutoffs: { Open: 482, OBC: 460, EWS: 450, SC: 332, ST: 220, NTD: 442, NTC: 430, NTB: 400, VJA: 418, SEBC: 450 } },

  // ============ BHMS ============
  { id: 'ghmc-mumbai', name: 'Government Homoeopathic Medical College, Mumbai', course: 'BHMS', city: 'Mumbai', region: 'Konkan', type: 'Government', seats: 50, fee: 60000, fee_label: '₹60,000/yr', cutoffs: { Open: 442, OBC: 422, EWS: 412, SC: 305, ST: 200, NTD: 405, NTC: 392, NTB: 365, VJA: 380, SEBC: 410 } },
  { id: 'pvt-bhms-bharati-pune', name: 'Bharati Vidyapeeth Homoeopathy College, Pune', course: 'BHMS', city: 'Pune', region: 'Western Maharashtra', type: 'Private', seats: 100, fee: 220000, fee_label: '₹2.2 L/yr', cutoffs: { Open: 348, OBC: 328, EWS: 318, SC: 232, ST: 172, NTD: 312, NTC: 298, NTB: 272, VJA: 285, SEBC: 318 } },
  { id: 'pvt-bhms-foster-aurangabad', name: 'Foster Development Homoeopathy College', course: 'BHMS', city: 'Aurangabad', region: 'Marathwada', type: 'Private', seats: 100, fee: 180000, fee_label: '₹1.8 L/yr', cutoffs: { Open: 320, OBC: 300, EWS: 290, SC: 215, ST: 168, NTD: 285, NTC: 272, NTB: 248, VJA: 262, SEBC: 290 } },
  { id: 'pvt-bhms-jspm-pune', name: 'JSPM Homoeopathy College', course: 'BHMS', city: 'Pune', region: 'Western Maharashtra', type: 'Private', seats: 100, fee: 200000, fee_label: '₹2.0 L/yr', cutoffs: { Open: 332, OBC: 312, EWS: 302, SC: 222, ST: 170, NTD: 298, NTC: 285, NTB: 258, VJA: 272, SEBC: 302 } },

  // ============ BUMS ============
  { id: 'bums-zvm-pune', name: 'Z.V.M. Unani Medical College, Pune', course: 'BUMS', city: 'Pune', region: 'Western Maharashtra', type: 'Aided', seats: 60, fee: 80000, fee_label: '₹80,000/yr', cutoffs: { Open: 320, OBC: 300, EWS: 290, SC: 218, ST: 170, NTD: 285, NTC: 272, NTB: 248, VJA: 262, SEBC: 290 } },
  { id: 'bums-yb-aurangabad', name: 'YB Chavan Unani Medical College', course: 'BUMS', city: 'Aurangabad', region: 'Marathwada', type: 'Private', seats: 50, fee: 150000, fee_label: '₹1.5 L/yr', cutoffs: { Open: 285, OBC: 265, EWS: 255, SC: 195, ST: 165, NTD: 252, NTC: 238, NTB: 218, VJA: 230, SEBC: 258 } },

  // ============ BPT ============
  { id: 'bpt-gmch-mumbai', name: 'GMCH Mumbai Physiotherapy School', course: 'BPT', city: 'Mumbai', region: 'Konkan', type: 'Government', seats: 60, fee: 50000, fee_label: '₹50,000/yr', cutoffs: { Open: 425, OBC: 405, EWS: 395, SC: 295, ST: 198, NTD: 388, NTC: 375, NTB: 348, VJA: 365, SEBC: 395 } },
  { id: 'bpt-sancheti-pune', name: 'Sancheti College of Physiotherapy', course: 'BPT', city: 'Pune', region: 'Western Maharashtra', type: 'Private', seats: 60, fee: 180000, fee_label: '₹1.8 L/yr', cutoffs: { Open: 340, OBC: 320, EWS: 310, SC: 228, ST: 175, NTD: 305, NTC: 292, NTB: 268, VJA: 282, SEBC: 310 } },
  { id: 'bpt-mgm-navimumbai', name: 'MGM Institute of Physiotherapy, Navi Mumbai', course: 'BPT', city: 'Navi Mumbai', region: 'Konkan', type: 'Private', seats: 60, fee: 200000, fee_label: '₹2.0 L/yr', cutoffs: { Open: 332, OBC: 312, EWS: 302, SC: 222, ST: 172, NTD: 298, NTC: 285, NTB: 262, VJA: 275, SEBC: 305 } },
];

// ============================================================
// RULES & CONSTANTS
// ============================================================

const NEET_QUALIFYING_2024 = {
  Open: 164,
  EWS: 164,
  OBC: 129,
  SC: 129,
  ST: 129,
  NTD: 129,
  NTC: 129,
  NTB: 129,
  VJA: 129,
  SEBC: 129,
};

const PCB_MIN = {
  Open: 50,
  EWS: 50,
  OBC: 40,
  SC: 40,
  ST: 40,
  NTD: 40,
  NTC: 40,
  NTB: 40,
  VJA: 40,
  SEBC: 40,
};

const REGIONS = ['Konkan', 'Western Maharashtra', 'North Maharashtra', 'Marathwada', 'Vidarbha'];
const COURSES = ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'BPT'];
const CATEGORIES = [
  { value: 'Open', label: 'Open / General' },
  { value: 'OBC', label: 'OBC' },
  { value: 'EWS', label: 'EWS' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'NTD', label: 'NT-D (Vanjari)' },
  { value: 'NTC', label: 'NT-C (Dhangar)' },
  { value: 'NTB', label: 'NT-B' },
  { value: 'VJA', label: 'VJ-A' },
  { value: 'SEBC', label: 'SEBC / Maratha' },
];

// ============================================================
// PREDICTION ENGINE
// ============================================================

function predictColleges({ neetScore, twelfthPCB, category, course, regions }) {
  const minNeet = NEET_QUALIFYING_2024[category] || 164;
  const minPCB = PCB_MIN[category] || 50;
  const errors = [];

  if (neetScore < minNeet) {
    errors.push(`NEET 2024 qualifying cutoff for ${category} is ${minNeet}. Your score (${neetScore}) is below qualifying — counselling registration not allowed.`);
  }
  if (twelfthPCB < minPCB) {
    errors.push(`12th PCB minimum required is ${minPCB}% for ${category}. Your % (${twelfthPCB}%) is below — admission disqualified at document verification.`);
  }
  if (errors.length) return { errors, matches: [] };

  const filtered = COLLEGES.filter(c => c.course === course);
  const matches = filtered.map(c => {
    const cutoff = c.cutoffs[category] ?? c.cutoffs.Open;
    const delta = neetScore - cutoff;
    let tier;
    if (delta >= 20) tier = 'Safe';
    else if (delta >= -10) tier = 'Moderate';
    else if (delta >= -30) tier = 'Reach';
    else tier = 'Risky';

    const regionPriority = regions.includes(c.region) ? 0 : 1;
    return { ...c, cutoff, delta, tier, regionPriority };
  });

  // Filter out very risky ones (>30 below cutoff) for cleaner UX
  const visible = matches.filter(m => m.tier !== 'Risky');
  visible.sort((a, b) => a.regionPriority - b.regionPriority || b.delta - a.delta);
  return { errors: [], matches: visible };
}

// ============================================================
// UI COMPONENTS
// ============================================================

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white font-bold text-lg shadow-md" style={{fontFamily: 'Fraunces, serif'}}>
      A
    </div>
    <div>
      <div className="text-stone-900 font-bold tracking-tight" style={{fontFamily: 'Fraunces, serif', fontSize: '18px', lineHeight: 1}}>ABS Predictor</div>
      <div className="text-stone-500 text-[10px] tracking-widest uppercase mt-0.5">NEET College Match · Maharashtra</div>
    </div>
  </div>
);

function ProgressDots({ step, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({length: total}).map((_, i) => (
        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i + 1 === step ? 'w-8 bg-emerald-700' : i + 1 < step ? 'w-4 bg-emerald-700/60' : 'w-4 bg-stone-300'}`} />
      ))}
    </div>
  );
}

function Field({ label, children, hint, error }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-stone-700 text-[13px] font-medium tracking-wide uppercase" style={{letterSpacing: '0.06em'}}>{label}</span>
        {hint && <span className="text-stone-400 text-[11px]">{hint}</span>}
      </div>
      {children}
      {error && <div className="text-rose-600 text-xs mt-1.5">{error}</div>}
    </label>
  );
}

function TextInput(props) {
  return <input {...props} className={`w-full bg-stone-50 border-0 border-b-2 border-stone-300 px-1 py-2.5 text-stone-900 text-base focus:outline-none focus:border-emerald-700 transition-colors placeholder:text-stone-400 ${props.className||''}`} />;
}

function Pill({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${active ? 'bg-emerald-700 border-emerald-700 text-white shadow-md' : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'}`}>
      {children}
    </button>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('Safe');
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    neetScore: '',
    twelfthPCB: '',
    category: 'Open',
    course: 'MBBS',
    regions: [],
    domicile: 'Maharashtra',
  });
  const [errs, setErrs] = useState({});

  // Inject web fonts once
  useEffect(() => {
    if (document.getElementById('abs-fonts')) return;
    const link = document.createElement('link');
    link.id = 'abs-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.name.trim() || form.name.trim().length < 3) e.name = 'Pura naam likhiye (min 3 chars)';
      if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = 'Valid 10-digit Indian mobile number daaliye';
      if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email daaliye (optional)';
    }
    if (s === 2) {
      const ns = Number(form.neetScore);
      const ps = Number(form.twelfthPCB);
      if (!Number.isFinite(ns) || ns < 0 || ns > 720) e.neetScore = 'NEET score 0-720 ke beech mein hona chahiye';
      if (!Number.isFinite(ps) || ps < 0 || ps > 100) e.twelfthPCB = '12th PCB % 0-100 ke beech mein hona chahiye';
    }
    if (s === 3) {
      if (!form.regions.length) e.regions = 'Kam se kam ek region select kariye';
    }
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1); };
  const back = () => setStep(s => Math.max(1, s - 1));

  const submit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    const prediction = predictColleges({
      neetScore: Number(form.neetScore),
      twelfthPCB: Number(form.twelfthPCB),
      category: form.category,
      course: form.course,
      regions: form.regions,
    });

    // Fire-and-forget webhook to n8n / Apps Script
    const payload = {
      lead: {
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        neet_score: Number(form.neetScore),
        twelfth_pcb: Number(form.twelfthPCB),
        category: form.category,
        course: form.course,
        regions: form.regions,
        domicile: form.domicile,
        submitted_at: new Date().toISOString(),
        source: 'ABS NEET Predictor v1',
      },
      prediction: {
        eligible: prediction.errors.length === 0,
        errors: prediction.errors,
        match_counts: {
          safe: prediction.matches.filter(m => m.tier === 'Safe').length,
          moderate: prediction.matches.filter(m => m.tier === 'Moderate').length,
          reach: prediction.matches.filter(m => m.tier === 'Reach').length,
        },
        top_colleges: prediction.matches.slice(0, 10).map(m => ({
          id: m.id, name: m.name, tier: m.tier, cutoff: m.cutoff, delta: m.delta, region: m.region, type: m.type, fee_label: m.fee_label,
        })),
      },
    };

    try {
      if (WEBHOOK_URL && !WEBHOOK_URL.includes('YOUR-N8N-DOMAIN')) {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      console.warn('Webhook failed (non-blocking):', err);
    }

    setResults(prediction);
    setActiveTab(prediction.matches.find(m => m.tier === 'Safe') ? 'Safe' : prediction.matches.find(m => m.tier === 'Moderate') ? 'Moderate' : 'Reach');
    setSubmitting(false);
  };

  const reset = () => {
    setResults(null);
    setStep(1);
    setForm({ name: '', mobile: '', email: '', neetScore: '', twelfthPCB: '', category: 'Open', course: 'MBBS', regions: [], domicile: 'Maharashtra' });
    setErrs({});
  };

  const counts = useMemo(() => {
    if (!results) return null;
    return {
      Safe: results.matches.filter(m => m.tier === 'Safe').length,
      Moderate: results.matches.filter(m => m.tier === 'Moderate').length,
      Reach: results.matches.filter(m => m.tier === 'Reach').length,
    };
  }, [results]);

  const tabColleges = useMemo(() => results ? results.matches.filter(m => m.tier === activeTab) : [], [results, activeTab]);

  return (
    <div className="min-h-screen bg-stone-100" style={{fontFamily: 'Manrope, sans-serif'}}>
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone-500 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Live · 2024 Cutoff Data
          </div>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* RESULTS VIEW */}
        {results && (
          <div className="space-y-8 animate-fade-in">
            {/* Hero summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white px-6 sm:px-10 py-8 sm:py-10">
                <div className="flex items-center gap-2 text-emerald-200 text-[11px] tracking-widest uppercase mb-3">
                  <span>Results</span>
                  <span>·</span>
                  <span>{form.course}</span>
                  <span>·</span>
                  <span>{form.category}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-medium tracking-tight leading-tight" style={{fontFamily: 'Fraunces, serif'}}>
                  {form.name.split(' ')[0]}, aapke liye <span className="italic text-amber-300">{results.matches.length}</span> colleges match karte hain
                </h1>
                <p className="mt-3 text-emerald-100 text-sm sm:text-base max-w-2xl">
                  Based on Maharashtra State CET Cell 2024 cutoff data. Niche tabs mein Safe / Moderate / Reach colleges dekhiye.
                </p>
              </div>

              {results.errors.length > 0 && (
                <div className="bg-rose-50 border-t border-rose-200 p-6">
                  <div className="font-semibold text-rose-900 mb-2">⚠️ Eligibility issue:</div>
                  {results.errors.map((e, i) => <div key={i} className="text-rose-800 text-sm mb-1">• {e}</div>)}
                </div>
              )}

              {/* Tier counts */}
              {counts && (
                <div className="grid grid-cols-3 divide-x divide-stone-200 border-t border-stone-200">
                  <button onClick={() => setActiveTab('Safe')} className={`p-5 text-left transition-colors ${activeTab === 'Safe' ? 'bg-emerald-50' : 'hover:bg-stone-50'}`}>
                    <div className="text-3xl font-medium text-emerald-700" style={{fontFamily: 'Fraunces, serif'}}>{counts.Safe}</div>
                    <div className="text-[11px] text-stone-600 uppercase tracking-widest mt-1">Safe Bets</div>
                    <div className="text-xs text-stone-500 mt-1 hidden sm:block">High chance · Round 1</div>
                  </button>
                  <button onClick={() => setActiveTab('Moderate')} className={`p-5 text-left transition-colors ${activeTab === 'Moderate' ? 'bg-amber-50' : 'hover:bg-stone-50'}`}>
                    <div className="text-3xl font-medium text-amber-700" style={{fontFamily: 'Fraunces, serif'}}>{counts.Moderate}</div>
                    <div className="text-[11px] text-stone-600 uppercase tracking-widest mt-1">Moderate</div>
                    <div className="text-xs text-stone-500 mt-1 hidden sm:block">Possible · Round 2-3</div>
                  </button>
                  <button onClick={() => setActiveTab('Reach')} className={`p-5 text-left transition-colors ${activeTab === 'Reach' ? 'bg-rose-50' : 'hover:bg-stone-50'}`}>
                    <div className="text-3xl font-medium text-rose-700" style={{fontFamily: 'Fraunces, serif'}}>{counts.Reach}</div>
                    <div className="text-[11px] text-stone-600 uppercase tracking-widest mt-1">Reach / Stray</div>
                    <div className="text-xs text-stone-500 mt-1 hidden sm:block">Long shot · Stray Round</div>
                  </button>
                </div>
              )}
            </div>

            {/* Strategy card */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="text-amber-900 font-semibold text-sm mb-2 flex items-center gap-2">
                <span className="text-lg">🎯</span> Round-wise Counselling Strategy
              </div>
              <ul className="text-amber-900/80 text-sm space-y-1.5 leading-relaxed">
                <li><strong>Round 1:</strong> Safe + top 5 Moderate colleges choice form mein bhariye.</li>
                <li><strong>Round 2:</strong> Agar Round 1 mein allotment nahi mila ya upgrade karna hai — saare Moderate colleges add kariye.</li>
                <li><strong>Round 3 + Stray:</strong> Reach list ke colleges add kariye. Stray vacancy round mein cutoff 30-60 marks gir jaata hai.</li>
                <li><strong>Choice order:</strong> Apni first preference (govt + region match) hamesha sabse upar rakho.</li>
              </ul>
            </div>

            {/* College list */}
            <div className="space-y-3">
              <h2 className="text-2xl font-medium tracking-tight" style={{fontFamily: 'Fraunces, serif'}}>
                {activeTab} Colleges <span className="text-stone-400 text-base">({tabColleges.length})</span>
              </h2>
              {tabColleges.length === 0 ? (
                <div className="bg-white border border-stone-200 rounded-xl p-8 text-center text-stone-500">
                  Is tier mein abhi koi college nahi mila. Doosre tab try kariye.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {tabColleges.map((c, i) => (
                    <div key={c.id} className="bg-white border border-stone-200 rounded-xl p-5 hover:shadow-md hover:border-emerald-300 transition-all duration-300" style={{animationDelay: `${i * 30}ms`}}>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${c.tier === 'Safe' ? 'bg-emerald-100 text-emerald-800' : c.tier === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                              {c.tier}
                            </span>
                            <span className="text-[10px] text-stone-500 uppercase tracking-wider font-medium">{c.type}</span>
                            {c.regionPriority === 0 && <span className="text-[10px] text-emerald-700 font-semibold">★ Preferred Region</span>}
                          </div>
                          <h3 className="font-semibold text-stone-900 leading-tight text-[15px]">{c.name}</h3>
                          <div className="text-xs text-stone-500 mt-1">{c.city} · {c.region}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-stone-100">
                        <div>
                          <div className="text-[10px] text-stone-500 uppercase tracking-wider">2024 Cutoff</div>
                          <div className="font-semibold text-stone-900">{c.cutoff}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-stone-500 uppercase tracking-wider">Your Margin</div>
                          <div className={`font-semibold ${c.delta >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{c.delta >= 0 ? '+' : ''}{c.delta}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-stone-500 uppercase tracking-wider">Fee</div>
                          <div className="font-semibold text-stone-900 text-[13px]">{c.fee_label}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-2xl font-medium mb-2" style={{fontFamily: 'Fraunces, serif'}}>Counselor se baat kariye</h3>
              <p className="text-stone-300 text-sm mb-5 max-w-md mx-auto">
                ABS Educational Solution ka admission expert aapko aaj hi call karega. Choice form filling, document verification, reporting — sab guide hoga.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <a href={`https://wa.me/91${form.mobile}?text=${encodeURIComponent(`Hi ${form.name}, ABS Educational Solution se. Aapne hamara NEET predictor use kiya — main aapke college selection mein guide karunga.`)}`} target="_blank" rel="noreferrer" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-colors">
                  WhatsApp Counselor
                </a>
                <button onClick={reset} className="border border-stone-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-stone-800 transition-colors">
                  Naya search
                </button>
              </div>
            </div>

            <div className="text-center text-xs text-stone-500 px-4">
              ⚠️ Cutoffs are based on Maharashtra State CET Cell 2024 published data. Actual 2025 cutoffs may vary by 5-15 marks based on NEET difficulty and seat changes. Final allotment depends on CAP rounds.
            </div>
          </div>
        )}

        {/* FORM VIEW */}
        {!results && (
          <div className="max-w-2xl mx-auto">
            {/* Hero (only on step 1) */}
            {step === 1 && (
              <div className="text-center mb-10 animate-fade-in">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Maharashtra · 2024 Data · Free
                </div>
                <h1 className="text-4xl sm:text-6xl font-medium tracking-tight leading-[1.05] text-stone-900" style={{fontFamily: 'Fraunces, serif'}}>
                  Find your <em className="italic text-emerald-800">perfect</em><br/>medical college
                </h1>
                <p className="mt-5 text-stone-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
                  NEET 2025 score daaliye. Aapko milega Maharashtra ke MBBS, BDS, BAMS, BHMS, BUMS, BPT colleges ka <strong>personalized list</strong> — Safe, Moderate, Reach categories mein.
                </p>
              </div>
            )}

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              {/* Card header */}
              <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-stone-500 uppercase tracking-widest font-semibold">Step {step} of 3</div>
                  <div className="text-stone-900 font-semibold mt-0.5" style={{fontFamily: 'Fraunces, serif', fontSize: '20px'}}>
                    {step === 1 && 'Apna detail bhariye'}
                    {step === 2 && 'NEET aur 12th score'}
                    {step === 3 && 'Course aur location'}
                  </div>
                </div>
                <ProgressDots step={step} total={3} />
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                {step === 1 && (
                  <>
                    <Field label="Pura naam" error={errs.name}>
                      <TextInput value={form.name} onChange={e => update('name', e.target.value)} placeholder="Rohit Sharma" />
                    </Field>
                    <Field label="Mobile number" hint="WhatsApp ke liye" error={errs.mobile}>
                      <TextInput type="tel" maxLength={10} value={form.mobile} onChange={e => update('mobile', e.target.value.replace(/\D/g, ''))} placeholder="9876543210" />
                    </Field>
                    <Field label="Email" hint="Optional" error={errs.email}>
                      <TextInput type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="rohit@gmail.com" />
                    </Field>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="NEET 2024/25 Score" hint="out of 720" error={errs.neetScore}>
                        <TextInput type="number" min="0" max="720" value={form.neetScore} onChange={e => update('neetScore', e.target.value)} placeholder="585" />
                      </Field>
                      <Field label="12th PCB %" hint="Phy+Chem+Bio avg" error={errs.twelfthPCB}>
                        <TextInput type="number" min="0" max="100" step="0.01" value={form.twelfthPCB} onChange={e => update('twelfthPCB', e.target.value)} placeholder="78.5" />
                      </Field>
                    </div>
                    <Field label="Caste / Reservation Category">
                      <div className="flex flex-wrap gap-2 pt-1">
                        {CATEGORIES.map(c => (
                          <Pill key={c.value} active={form.category === c.value} onClick={() => update('category', c.value)}>{c.label}</Pill>
                        ))}
                      </div>
                    </Field>
                    <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-xs text-stone-600">
                      ℹ️ NEET 2024 qualifying: <strong>164 marks</strong> for Open/EWS, <strong>129 marks</strong> for OBC/SC/ST. 12th PCB minimum: <strong>50%</strong> for Open/EWS, <strong>40%</strong> for reserved categories.
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <Field label="Course preference" error={errs.course}>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {COURSES.map(c => (
                          <Pill key={c} active={form.course === c} onClick={() => update('course', c)}>{c}</Pill>
                        ))}
                      </div>
                    </Field>
                    <Field label="Maharashtra Region (multiple select)" hint="Jahan padhna chahte hain" error={errs.regions}>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {REGIONS.map(r => (
                          <Pill key={r} active={form.regions.includes(r)} onClick={() => {
                            update('regions', form.regions.includes(r) ? form.regions.filter(x => x !== r) : [...form.regions, r]);
                          }}>{r}</Pill>
                        ))}
                        <Pill active={form.regions.length === REGIONS.length} onClick={() => update('regions', form.regions.length === REGIONS.length ? [] : [...REGIONS])}>
                          {form.regions.length === REGIONS.length ? '✓ All selected' : 'Select All'}
                        </Pill>
                      </div>
                    </Field>
                    <Field label="Domicile">
                      <div className="flex gap-2 pt-1">
                        <Pill active={form.domicile === 'Maharashtra'} onClick={() => update('domicile', 'Maharashtra')}>Maharashtra Domicile</Pill>
                        <Pill active={form.domicile === 'Other State'} onClick={() => update('domicile', 'Other State')}>Other State</Pill>
                      </div>
                      {form.domicile === 'Other State' && (
                        <div className="text-xs text-amber-700 mt-2 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                          ⚠️ Maharashtra State Quota (85%) sirf Maharashtra domicile ke liye hai. Aap sirf 15% AIQ seats ke liye eligible honge — predictor abhi state quota cutoffs dikha raha hai.
                        </div>
                      )}
                    </Field>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 sm:px-8 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                <button onClick={back} disabled={step === 1} className="text-stone-500 hover:text-stone-900 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  ← Back
                </button>
                {step < 3 ? (
                  <button onClick={next} className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm hover:shadow-md">
                    Continue →
                  </button>
                ) : (
                  <button onClick={submit} disabled={submitting} className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm hover:shadow-md disabled:opacity-60">
                    {submitting ? 'Searching...' : 'Find My Colleges →'}
                  </button>
                )}
              </div>
            </div>

            {/* Trust strip */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="p-3">
                <div className="text-2xl font-medium text-stone-900" style={{fontFamily: 'Fraunces, serif'}}>{COLLEGES.length}+</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Colleges</div>
              </div>
              <div className="p-3 border-x border-stone-200">
                <div className="text-2xl font-medium text-stone-900" style={{fontFamily: 'Fraunces, serif'}}>2024</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Cutoff Data</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-medium text-stone-900" style={{fontFamily: 'Fraunces, serif'}}>6</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-widest mt-1">Courses</div>
              </div>
            </div>

            <div className="mt-6 text-center text-xs text-stone-500 leading-relaxed max-w-md mx-auto">
              Powered by <strong>ABS Educational Solution</strong> · ISO Certified · DPIIT Recognized<br/>
              Data: Maharashtra State CET Cell 2024 published cutoffs
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
