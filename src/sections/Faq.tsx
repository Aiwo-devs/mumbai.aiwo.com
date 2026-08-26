import { useMemo, useState } from 'react'
import { PlusMinusIcon } from '../components/ui/Icons'
import { Button } from '../components/ui/Button'
import { smartQuotes } from '../lib/text'
import type { FaqItem } from '../types/shared'
import './Faq.css'

interface FaqProps {
  id?: string
  eyebrow?: string
  headline?: string
  items: FaqItem[]
  /** Optional question→category map. Omit for a single
   * uncategorised "All" list — the sidebar still renders, just with one entry,
   * same component/visual language either way. */
  categoryByQuestion?: Record<string, string>
  categoryOrder?: string[]
  initialCount?: number
}

export function Faq({
  id = 'faq',
  eyebrow = 'COMMON QUESTIONS',
  headline = "Everything you're wondering.",
  items,
  categoryByQuestion,
  categoryOrder = categoryByQuestion ? ['All', ...new Set(Object.values(categoryByQuestion))] : ['All'],
  initialCount = 6,
}: FaqProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showAll, setShowAll] = useState(false)

  const filteredItems = useMemo(
    () =>
      activeCategory === 'All' || !categoryByQuestion
        ? items
        : items.filter((item) => categoryByQuestion[item.question] === activeCategory),
    [activeCategory, items, categoryByQuestion],
  )

  const hasMore = filteredItems.length > initialCount
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, initialCount)
  const showCategoryNav = categoryOrder.length > 1

  return (
    <section id={id} className="section faq">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{headline}</h2>
        </div>

        <div className="faq__layout">
          {showCategoryNav && (
            <nav className="faq__categories" aria-label="FAQ categories">
              {categoryOrder.map((category) => {
                const count =
                  category === 'All'
                    ? items.length
                    : items.filter((item) => categoryByQuestion?.[item.question] === category).length
                return (
                  <button
                    key={category}
                    type="button"
                    className={
                      category === activeCategory ? 'faq__category faq__category--active' : 'faq__category'
                    }
                    aria-pressed={category === activeCategory}
                    onClick={() => {
                      setActiveCategory(category)
                      setOpenIndex(0)
                      setShowAll(false)
                    }}
                  >
                    <span>{category}</span>
                    <span className="faq__category-count">{count}</span>
                  </button>
                )
              })}
            </nav>
          )}

          <div className="faq__list-wrap">
            <div className={!showAll && hasMore ? 'faq-accordion faq-accordion--fade' : 'faq-accordion'}>
              {visibleItems.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={item.question} className="faq-item">
                    <button
                      type="button"
                      className="faq-item__trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <PlusMinusIcon className="faq-item__toggle" open={isOpen} />
                    </button>
                    {isOpen && (
                      <div id={`faq-panel-${index}`} className="faq-item__panel">
                        <p>{smartQuotes(item.answer)}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {hasMore && (
              <Button
                variant="secondary"
                size="md"
                className="faq__show-more"
                onClick={() => setShowAll((v) => !v)}
              >
                {showAll ? 'Show less' : `Show more FAQs (${filteredItems.length - initialCount})`}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
