// Select by node identifier matching a pattern
export function idPatternFilter(pattern, {nodes, edges}) {
  return {
    nodes: (nodes||[]).filter(n => pattern.test(n.id)),
    edges: (edges||[]).filter(e => pattern.test(e.from) && pattern.test(e.to))
  }
}

// Filter out loops (edges from node to itself)
export function noLoopsFilter({nodes, edges}) {
  return {
    nodes,
    edges: (edges||[]).filter(e => e.from !== e.to)
  }
}

export const warn = {
  graphReduced(before, after, subtype={}) {
    const removed = []
    for (let type of ["nodes", "edges"]) {
      const diff = before?.[type]?.length - after?.[type]?.length
      if (diff > 0) {
        var name = subtype[type] ? subtype[type] + " " + type : type
        if (diff === 1) {name = name.replace(/s$/,"")}
        removed.push(`${diff} ${name}`)
      }
    }
    if (removed.length > 0) {
      console.error(`Removed ${removed.join(" and ")}!`)
    }
  }
}
