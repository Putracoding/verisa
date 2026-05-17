import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, signInWithGoogle } from '../../lib/firebase';
import { Review } from '../../types';
import { Star, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetchedReviews);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reviews');
    });

    return () => unsubscribe();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await signInWithGoogle();
      return;
    }

    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        productId,
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userAvatar: user.photoURL,
        rating,
        comment,
        createdAt: serverTimestamp()
      });
      setComment('');
      setRating(5);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'reviews');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-sm shadow-sm">
      <h2 className="bg-gray-50 text-lg font-medium p-3 mb-6 uppercase text-gray-700 flex items-center gap-2">
        <MessageSquare size={20} className="text-verisa-orange" />
        Penilaian Produk
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
        {/* Review Form */}
        <div className="border-r border-gray-100 pr-8">
          <h3 className="font-bold text-gray-800 mb-4">Tulis Ulasan</h3>
          {user ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={num <= rating ? "text-verisa-orange fill-verisa-orange" : "text-gray-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Berikan ulasan Anda tentang produk ini..."
                className="w-full border border-gray-200 rounded-sm p-3 text-sm h-32 focus:outline-none focus:border-verisa-orange"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-verisa-orange text-white py-2 rounded-sm font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {submitting ? "Mengirim..." : "Kirim Ulasan"}
              </button>
            </form>
          ) : (
            <div className="bg-gray-50 p-6 text-center rounded-sm">
              <p className="text-sm text-gray-500 mb-4">Silakan login untuk memberikan ulasan</p>
              <button
                onClick={signInWithGoogle}
                className="btn-primary w-full"
              >
                Login dengan Google
              </button>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
             <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-verisa-orange">
                  {reviews.length > 0 
                    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
                    : "0.0"}
                </span>
                <span className="text-gray-400">dari 5</span>
             </div>
             <div className="text-sm text-gray-500">
                {reviews.length} Ulasan
             </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 border-b border-gray-50 pb-6 last:border-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                      {review.userAvatar ? (
                        <img src={review.userAvatar} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <User size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-gray-800">{review.userName}</span>
                      <div className="flex text-verisa-orange">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString('id-ID') : 'Baru saja'}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-10 text-center text-gray-400 italic text-sm">
                  Belum ada ulasan untuk produk ini.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
