import React from 'react';
import './ArticleSectionRenderer.css';

function renderTextBlocks(content) {
  return content.split('\n\n').map((block, index) => {
    const trimmedBlock = block.trim();

    if (!trimmedBlock) {
      return null;
    }

    if (trimmedBlock.startsWith('### ')) {
      return (
        <h3 key={index} className="article-rich-text__heading">
          {trimmedBlock.replace('### ', '')}
        </h3>
      );
    }

    return (
      <p key={index} className="article-rich-text__paragraph">
        {trimmedBlock}
      </p>
    );
  });
}

function ArticleSectionRenderer({ section }) {
  switch (section.type) {
    case 'text':
      return <div className="article-section article-rich-text">{renderTextBlocks(section.content)}</div>;

    case 'steps':
      return (
        <section className="article-section article-panel">
          <h2>{section.title}</h2>
          <ol className="article-steps">
            {section.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      );

    case 'analogy':
      return (
        <section className="article-section article-panel article-panel--accent">
          <h2>{section.title}</h2>
          <div className="article-rich-text">{renderTextBlocks(section.content)}</div>
        </section>
      );

    case 'table':
      return (
        <section className="article-section article-panel">
          <h2>{section.title}</h2>
          <div className="article-table-wrap">
            <table className="article-table">
              <thead>
                <tr>
                  {section.headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row) => (
                  <tr key={row.join('-')}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );

    case 'list':
      return (
        <section className="article-section article-panel">
          <h2>{section.title}</h2>
          <ul className="article-checklist">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      );

    case 'insurance_type':
      return (
        <section className="article-section article-info-card">
          <div className="article-info-card__title">
            <span>{section.icon}</span>
            <h2>{section.title}</h2>
          </div>
          <p>{section.description}</p>
          <p><strong>Пример:</strong> {section.example}</p>
          {section.covers ? <p><strong>Что покрывает:</strong> {section.covers}</p> : null}
          {section.note ? <p><strong>Важно:</strong> {section.note}</p> : null}
          {section.also_covers ? <p><strong>Также покрывает:</strong> {section.also_covers}</p> : null}
        </section>
      );

    case 'scenario':
      return (
        <section className="article-section article-scenario">
          <div className="article-scenario__title">
            <span>{section.icon}</span>
            <h2>{section.title}</h2>
          </div>
          <div className="article-scenario__grid">
            <div className="article-scenario__card">
              <h3>Что произошло</h3>
              <p>{section.before}</p>
            </div>
            <div className="article-scenario__card article-scenario__card--muted">
              <h3>Без страховки</h3>
              <p>{section.without_insurance}</p>
            </div>
            <div className="article-scenario__card article-scenario__card--accent">
              <h3>Со страховкой</h3>
              <p>{section.with_insurance}</p>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}

export default ArticleSectionRenderer;
