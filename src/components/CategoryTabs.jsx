// Composant onglets de catégories — navigation fluide entre les sections
export default function CategoryTabs({ categories, activeIndex, onSelect }) {
  return (
    <nav className="category-tabs" role="tablist">
      {categories.map((cat, index) => (
        <button
          key={cat.categorie}
          role="tab"
          aria-selected={activeIndex === index}
          className={`category-tab ${activeIndex === index ? 'active' : ''}`}
          onClick={() => onSelect(index)}
        >
          <span className="category-tab__icon">{cat.icone}</span>
          {cat.categorie}
        </button>
      ))}
    </nav>
  )
}
