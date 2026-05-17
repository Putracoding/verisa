export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-1">
          <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Customer Service</h3>
          <ul className="text-xs text-gray-500 space-y-2">
            <li>Pusat Bantuan</li>
            <li>Cara Pembelian</li>
            <li>Pengiriman</li>
            <li>Pengembalian Barang & Dana</li>
            <li>Hubungi Kami</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Tentang Verisa Shop</h3>
          <ul className="text-xs text-gray-500 space-y-2">
            <li>Tentang Kami</li>
            <li>Karir</li>
            <li>Kebijakan Privasi</li>
            <li>Blog</li>
            <li>Seller Centre</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Pembayaran</h3>
          <div className="grid grid-cols-3 gap-2 grayscale opacity-50">
            <div className="bg-gray-100 h-8 rounded"></div>
            <div className="bg-gray-100 h-8 rounded"></div>
            <div className="bg-gray-100 h-8 rounded"></div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Ikuti Kami</h3>
          <ul className="text-xs text-gray-500 space-y-2">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Download Aplikasi</h3>
          <div className="flex gap-4">
             <div className="bg-gray-100 w-24 h-8 rounded"></div>
             <div className="bg-gray-100 w-24 h-8 rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
        <p>© 2026 Verisa Shop. Kebijakan Privasi | Syarat & Ketentuan</p>
        <p className="mt-2">Negara & Wilayah: Indonesia | Singapore | Malaysia | Thailand | Vietnam</p>
      </div>
    </footer>
  );
}
