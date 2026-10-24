import { cloneElement, isValidElement, Fragment } from 'react';

function splitText(node, state) {
  if (node == null || typeof node === 'boolean') return null;

  if (typeof node === 'string') {
    return node
      .split(/(\s+)/)
      .filter(Boolean)
      .map((part) => {
        if (/^\s+$/.test(part)) {
          return <Fragment key={`f${state.k++}`}>{part}</Fragment>;
        }
        const wi = state.w++;
        return (
          <span key={`w${state.k++}`} className="wr-word" style={{ '--wi': wi }}>
            {part}
          </span>
        );
      });
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => {
      const out = splitText(child, state);
      if (isValidElement(out) && out.key == null) return cloneElement(out, { key: i });
      return out;
    });
  }

  if (isValidElement(node)) {
    return cloneElement(
      node,
      { key: state.k++ },
      splitText(node.props.children, state)
    );
  }

  return node;
}

export default function WordReveal({ children, className = '' }) {
  const state = { w: 0, k: 0 };
  return (
    <span className={`word-reveal${className ? ` ${className}` : ''}`}>
      {splitText(children, state)}
    </span>
  );
}
