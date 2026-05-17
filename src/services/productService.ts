import { collection, getDocs, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, Category } from '../types';

// Import generated images
import laptopImg from '../assets/images/product_laptop_gaming_1779007745116.png';
import sneakersImg from '../assets/images/product_sneakers_modern_1779007758454.png';
import skincareImg from '../assets/images/product_skincare_set_1779007774452.png';
import tshirtImg from '../assets/images/product_tshirt_black_1779008532041.png';
import smartwatchImg from '../assets/images/product_smartwatch_black_1779008553113.png';
import headphonesImg from '../assets/images/product_headphones_wireless_1779008567515.png';
import keyboardImg from '../assets/images/product_gaming_keyboard_1779008582501.png';
import mouseImg from '../assets/images/product_gaming_mouse_1779008597463.png';

export const productCollection = collection(db, 'products');
export const categoryCollection = collection(db, 'categories');

export const getProducts = async (limitCount = 12) => {
  const q = query(productCollection, orderBy('createdAt', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const seedDatabase = async () => {
  const products = [
    {
      name: "Laptop Gaming Verisa X1 Pro - RTX 4060, 16GB RAM, 1TB SSD",
      price: 15999000,
      description: "Laptop gaming performa tinggi dengan desain sleek dan keyboard RGB. Dilengkapi dengan layar 144Hz untuk pengalaman gaming yang mulus.",
      mainImage: laptopImg,
      categoryId: "electronics",
      stock: 10,
      rating: 4.9,
      reviewsCount: 124,
      createdAt: new Date().toISOString()
    },
    {
      name: "Sneakers Verisa Urban Run - White Orange Limited Edition",
      price: 899000,
      description: "Sneakers stylish dan nyaman untuk penggunaan harian maupun olahraga ringan. Menggunakan bahan breathable mesh dan outsole yang empuk.",
      mainImage: sneakersImg,
      categoryId: "fashion",
      stock: 50,
      rating: 4.8,
      reviewsCount: 450,
      createdAt: new Date().toISOString()
    },
    {
      name: "Verisa Luxe Skincare Set - Brightening & Anti-Aging",
      price: 1250000,
      description: "Paket perawatan wajah lengkap untuk kulit lebih cerah dan tampak muda. Terdiri dari Cleanser, Toner, Serum, dan Moisturizer.",
      mainImage: skincareImg,
      categoryId: "beauty",
      stock: 30,
      rating: 4.7,
      reviewsCount: 89,
      createdAt: new Date().toISOString()
    },
    {
      name: "T-Shirt Verisa Premium Cotton - Jet Black",
      price: 199000,
      description: "Kaos katun premium 24s dengan potongan oversized yang nyaman dan tidak mudah melar. Cocok untuk tampilan casual setiap hari.",
      mainImage: tshirtImg,
      categoryId: "fashion",
      stock: 100,
      rating: 4.9,
      reviewsCount: 1250,
      createdAt: new Date().toISOString()
    },
    {
      name: "Smartwatch Verisa Pulse Pro - AMOLED Display & GPS",
      price: 2499000,
      description: "Jam tangan pintar dengan fitur pemantau kesehatan lengkap, GPS built-in, dan daya tahan baterai hingga 14 hari.",
      mainImage: smartwatchImg,
      categoryId: "electronics",
      stock: 25,
      rating: 4.6,
      reviewsCount: 312,
      createdAt: new Date().toISOString()
    },
    {
      name: "Headphones Verisa Sonic ANC - Noise Cancelling Wireless",
      price: 1850000,
      description: "Nikmati musik tanpa gangguan dengan fitur Active Noise Cancelling tingkat lanjut. Suara bass yang powerful dan jernih.",
      mainImage: headphonesImg,
      categoryId: "electronics",
      stock: 15,
      rating: 4.8,
      reviewsCount: 567,
      createdAt: new Date().toISOString()
    },
    {
      name: "Mechanical Keyboard Verisa Mechanical-K - RGB Backlit",
      price: 850000,
      description: "Keyboard mekanik dengan switch tactile yang responsif. Dilengkapi dengan 18 mode pencahayaan RGB yang menawan.",
      mainImage: keyboardImg,
      categoryId: "electronics",
      stock: 40,
      rating: 4.7,
      reviewsCount: 220,
      createdAt: new Date().toISOString()
    },
    {
      name: "Gaming Mouse Verisa Swift G - 16000 DPI Optical Sensor",
      price: 499000,
      description: "Mouse gaming ultra-ringan dengan sensor optik presisi tinggi. Desain ergonomis untuk kenyamanan maksimal saat bermain lama.",
      mainImage: mouseImg,
      categoryId: "electronics",
      stock: 60,
      rating: 4.9,
      reviewsCount: 840,
      createdAt: new Date().toISOString()
    }
  ];

  for (const product of products) {
    await addDoc(productCollection, {
      ...product,
      createdAt: serverTimestamp()
    });
  }
};
