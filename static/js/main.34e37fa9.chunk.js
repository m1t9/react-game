(this["webpackJsonpreact-game"]=this["webpackJsonpreact-game"]||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),i=a(6),s=a.n(i),o=(a(13),a(14),a(3)),c=a(4),l=a(2),u=a(8),g=a(7),d={FIELD_SIZE:3,X_FIGURE:"X",O_FIGURE:"O",TIE:"t",NONE:"n"},m=function(){function e(){Object(o.a)(this,e),this.gameBoard=void 0,this.gameBoard=[];for(var t=0;t<3;t+=1){for(var a=[],r=0;r<3;r+=1)a.push({value:t*d.FIELD_SIZE+r,x:t,y:r});this.gameBoard.push(a)}}return Object(c.a)(e,[{key:"setItem",value:function(e,t,a){this.gameBoard[t][a].value!==d.X_FIGURE&&this.gameBoard[t][a].value!==d.Y_FIGURE&&(this.gameBoard[t][a].value=e),localStorage.setItem("board",JSON.stringify(this.gameBoard))}},{key:"isEmpty",value:function(){for(var e=!1,t=0;t<3;t+=1)for(var a=0;a<3;a+=1){var r=this.gameBoard[t][a].value;r!==d.X_FIGURE&&r!==d.O_FIGURE&&(e=!0)}return e}},{key:"computerStep",value:function(e){if(this.isEmpty()){for(var t=Math.floor(3*Math.random()),a=Math.floor(3*Math.random());this.gameBoard[t][a].value===d.X_FIGURE||this.gameBoard[t][a].value===d.O_FIGURE;)t=Math.floor(3*Math.random()),a=Math.floor(3*Math.random());this.gameBoard[t][a].value=e,localStorage.setItem("board",JSON.stringify(this.gameBoard))}}},{key:"checkWinner",value:function(){for(var e=0;e<d.FIELD_SIZE;e+=1){var t=this.gameBoard[0][e].value===this.gameBoard[1][e].value&&this.gameBoard[1][e].value===this.gameBoard[2][e].value,a=this.gameBoard[e][0].value===this.gameBoard[e][1].value&&this.gameBoard[e][1].value===this.gameBoard[e][2].value;if(t)return{figure:this.gameBoard[0][e].value,start:[0,e],end:[2,e],winCells:[[0,e],[1,e],[2,e]]};if(a)return{figure:this.gameBoard[e][0].value,start:[e,0],end:[e,2],winCells:[[e,0],[e,1],[e,2]]}}var r=this.gameBoard[0][0].value===this.gameBoard[1][1].value&&this.gameBoard[1][1].value===this.gameBoard[2][2].value,n=this.gameBoard[0][2].value===this.gameBoard[1][1].value&&this.gameBoard[1][1].value===this.gameBoard[2][0].value;return r?{figure:this.gameBoard[0][0].value,start:[0,0],end:[2,2],winCells:[[0,0],[1,1],[2,2]]}:n?{figure:this.gameBoard[0][2].value,start:[0,2],end:[2,0],winCells:[[0,2],[1,1],[2,0]]}:this.isEmpty()?{figure:d.NONE,start:[],end:[],winCells:[]}:{figure:d.TIE,start:[],end:[],winCells:[]}}}]),e}(),h=a(0),v=!0,f=new m,B=localStorage.getItem("board")||JSON.stringify(f.gameBoard),I=+(localStorage.getItem("gameWins")||0),O=+(localStorage.getItem("gameLose")||0),E=+(localStorage.getItem("gameLose")||0);function b(e,t,a){var r=!1;return e.forEach((function(e){e[0]===t&&e[1]===a&&(r=!0)})),r}f.gameBoard=JSON.parse(B);var j=function(e){return Object(h.jsx)("div",{className:"".concat(b(e.winCells,e.x,e.y)?"cell win":e.aviable?e.win===d.NONE?"cell aviable":"cell":"cell insert"),onClick:e.onClick,children:e.value})},S=function(e){Object(u.a)(a,e);var t=Object(g.a)(a);function a(e){var r;return Object(o.a)(this,a),(r=t.call(this,e)).state={status:"Current player: ".concat(d.X_FIGURE),isNext:!0,res:r.getBoard(),win:f.checkWinner().figure,lose:0,tie:0},r.changeFigureState=r.changeFigureState.bind(Object(l.a)(r)),r.newGame=r.newGame.bind(Object(l.a)(r)),r.reset=r.reset.bind(Object(l.a)(r)),r}return Object(c.a)(a,[{key:"newGame",value:function(){f=new m,localStorage.setItem("board",JSON.stringify(f.gameBoard)),v=!0,this.setState({res:this.getBoard()})}},{key:"reset",value:function(){I=0,O=0,E=0,localStorage.setItem("gameWins",I.toString()),localStorage.setItem("gameLose",O.toString()),localStorage.setItem("gameTies",E.toString()),this.newGame()}},{key:"renderCell",value:function(e,t,a,r){return Object(h.jsx)(j,{value:e!==d.X_FIGURE&&e!==d.O_FIGURE?"":e,x:t,y:a,aviable:r,win:f.checkWinner().figure,winCells:f.checkWinner().winCells,onClick:function(){if(r&&f.checkWinner().figure===d.NONE){f.setItem(v?d.X_FIGURE:d.O_FIGURE,t,a);var e=f.checkWinner().figure;e===d.NONE?setTimeout((function(){f.computerStep(d.O_FIGURE),"O"===(e=f.checkWinner().figure)&&(O+=1,localStorage.setItem("gameLose",O.toString()))}),10):e===d.X_FIGURE?(I+=1,localStorage.setItem("gameWins",I.toString())):e===d.TIE&&(E+=1,localStorage.setItem("gameTies",E.toString()))}}},"".concat(t).concat(a))}},{key:"getBoard",value:function(){var e=this,t=[];return f.gameBoard.forEach((function(a){a.forEach((function(a){t.push(e.renderCell(a.value,a.x,a.y,a.value!==d.X_FIGURE&&a.value!==d.O_FIGURE))}))})),t}},{key:"changeFigureState",value:function(){var e=this;this.setState({isNext:!this.state.isNext}),this.setState({res:this.getBoard(),win:f.checkWinner().figure}),setTimeout((function(){e.setState({res:e.getBoard()}),e.setState({isNext:!e.state.isNext})}),500)}},{key:"render",value:function(){var e,t=f.checkWinner().figure;return e=t!==d.NONE?t===d.TIE?"TIE":"Winner: ".concat(t):this.state.isNext?"Current player: ".concat(d.X_FIGURE):"Current player: ".concat(d.O_FIGURE),Object(h.jsxs)("div",{className:"gameBoard",children:[Object(h.jsx)("div",{className:"status",children:e}),Object(h.jsxs)("div",{className:"resultsBlock",children:[Object(h.jsx)("div",{className:"res",children:"Wins: ".concat(I)}),Object(h.jsx)("div",{className:"res",children:"Lose: ".concat(O)}),Object(h.jsx)("div",{className:"res",children:"Tie: ".concat(E)})]}),Object(h.jsx)("div",{onClick:this.changeFigureState,className:"board",children:this.state.res},"board"),Object(h.jsxs)("div",{className:"buttonBox",children:[Object(h.jsx)("button",{className:"funcButton",onClick:this.newGame,children:"New game"}),Object(h.jsx)("button",{className:"funcButton",onClick:this.reset,children:"Reset"}),Object(h.jsx)("p",{className:"info",children:"Press 'F' to fullscreen"})]})]})}}]),a}(n.a.Component),N=function(){return Object(h.jsx)(S,{})},F=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,17)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,i=t.getLCP,s=t.getTTFB;a(e),r(e),n(e),i(e),s(e)}))},k=!1;window.addEventListener("keydown",(function(e){"f"===e.key&&(k?document.exitFullscreen():document.documentElement.requestFullscreen(),k=!k)})),s.a.render(Object(h.jsx)(n.a.StrictMode,{children:Object(h.jsx)(N,{})}),document.getElementById("root")),F()}},[[16,1,2]]]);
//# sourceMappingURL=main.34e37fa9.chunk.js.map