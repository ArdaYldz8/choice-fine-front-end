import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function ShoppingCart() {
  const { state, removeItem, updateQuantity, closeCart, submitOrder } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!state.isOpen) return null;

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    const success = await submitOrder(orderNotes);
    
    if (success) {
      setOrderNotes('');
      setShowOrderForm(false);
      // Show success message (you could add a toast here)
      alert('Order submitted successfully! We will contact you soon.');
    } else {
      alert('Failed to submit order. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-primaryBlue" />
              <h2 className="text-lg font-serif font-bold text-neutralBlack">
                Shopping Cart
              </h2>
              {state.totalItems > 0 && (
                <span className="bg-primaryBlue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.totalItems}
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Package className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Start shopping to add items to your cart</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1556909114-4f0f33e6a3c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-neutralBlack truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">{item.packSize || 'Unit'}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(item.tags || []).slice(0, 2).map((tag, index) => (
                            <span
                              key={`${tag}-${index}`}
                              className="bg-primaryBlue text-white text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">
                        {item.quantity} × {item.packSize || 'Unit'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-neutralBlack">Total Items:</span>
                  <span className="font-bold text-primaryBlue">{state.totalItems}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  * Pricing will be provided after order review
                </p>
              </div>

              {/* Order Form */}
              {showOrderForm ? (
                <div className="space-y-3">
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Add any special notes or requirements..."
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none"
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting}
                      className="flex-1 btn-primary text-sm py-3"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Order'}
                    </button>
                    <button
                      onClick={() => setShowOrderForm(false)}
                      className="px-4 py-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="w-full btn-primary text-sm py-3"
                >
                  Proceed to Order
                </button>
              )}
              
              <p className="text-xs text-gray-500 text-center">
                No payment required online. We'll contact you for payment details.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 