import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const InstagramSection: React.FC = () => {
  const { siteSettings, buildWhatsAppUrl } = useData();

  const posts = [
    {
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
      caption: 'Corseted French lace bespoke reception gown crafted for our bride in Lagos. #CelineStudio'
    },
    {
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      caption: 'The Sovereign Senator in deep charcoal Super 160s cashmere wool. #LagosMensFashion'
    },
    {
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      caption: 'Heritage Hollandais wax wrap skirt and sculptural bodice. #AfricanHauteCouture'
    },
    {
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      caption: 'Three-piece Royal Damask Agbada with filigree embroidery. #AsoEbiRoyalty'
    },
    {
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      caption: 'Minimalist unisex architectural tunic set in organic sand linen. #ContemporaryAfrica'
    },
    {
      image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=600&q=80',
      caption: 'Behind the scenes at our Iyana-Isashi atelier: hand-finishing beadwork on duchess silk.'
    }
  ];

  return (
    <section className="py-20 bg-[#08080a] border-b border-[#1c1c22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-medium mb-1">
              <Instagram className="w-3.5 h-3.5" />
              <span>@celinestudio.ng</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#f5f3ef] font-medium">
              Follow Our Atelier Journey
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs text-[#c5a880] uppercase tracking-wider font-semibold hover:underline"
          >
            <span>Follow on Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#15151c] border border-[#23232c] hover:border-[#c5a880]/60 transition-all block"
            >
              <img
                src={post.image}
                alt="Celine Studio Instagram Post"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#0c0c0e]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <Instagram className="w-4 h-4 text-[#c5a880] mb-1" />
                <p className="text-[10px] text-[#dedcd5] line-clamp-2 leading-tight">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
