/**
 *
 */
class SampleDiagrams {
  Diagram1 = `digraph {
  rankdir = LR;
  node [fontcolor=white,color=green,shape=doublecircle]; LR_0 LR_3 LR_4 LR_8;
  node [fontcolor=orange,color=yellow,shape = circle];
  edge [arrowhead=vee,color=white,fontcolor=white];
  LR_0 -> LR_2 [ arrowhead=dot, color=red, fontcolor=red,label="SS(B)" ];
  LR_0 -> LR_1 [ label = "SS(S)" ];
  LR_1 -> LR_3 [ label = "S($end)" ];
  LR_2 -> LR_6 [ label = "SS(b)" ];
  LR_2 -> LR_5 [ label = "SS(a)" ];
  LR_2 -> LR_4 [ label = "S(A)" ];
  LR_5 -> LR_7 [ label = "S(b)" ];
  LR_5 -> LR_5 [ label = "S(a)" ];
  LR_6 -> LR_6 [ label = "S(b)" ];
  LR_6 -> LR_5 [ label = "S(a)" ];
  LR_7 -> LR_8 [ label = "S(b)" ];
  LR_7 -> LR_5 [ label = "S(a)" ];
  LR_8 -> LR_6 [ label = "S(b)" ];
  LR_8 -> LR_5 [ label = "S(a)" ];
  }`;

  Diagram2 = `digraph G {
  subgraph cluster_0 {
    style=filled;
    color="#FFFFFF";
    node [style=filled,color=green];
    edge [style=filled,color=blue];
    a0 -> a1 -> a2 -> a3;
    label = "process #1";
  }
  subgraph cluster_1 {
    node [style=filled];
    b0 -> b1 -> b2 -> b3;
    label = "process #2";
    color=blue
  }
  start -> a0;
  start -> b0;
  a1 -> b3;
  b2 -> a3;
  a3 -> a0;
  a3 -> end;
  b3 -> end;

  start [shape=Mdiamond];
  end [shape=Msquare];
  }`;
}

const SampleDiagram = new SampleDiagrams();

export { SampleDiagram };
