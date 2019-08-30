import * as d3 from 'd3';
import { Component, AfterContentInit, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { gMC } from './gMC';
import { gmx } from './gmx';
import { z7f } from './z7f';
import { YOL } from './YOL';

@Component({
    selector: 'Oh42944',
    templateUrl: './MiH.html' ,
    styleUrls: ['./MiH.scss'],
   encapsulation: ViewEncapsulation.None
})
export class MiH implements OnInit, AfterContentInit {
   
   public lcY: string = YOL.Wfb;
   public GTe: string = YOL.Br8;
   public hLE: string = YOL.KBV;
   private GID: any = { 
               mz_stringQ:    YOL.Upv,
               mz_stringJ:    YOL.Vgo,
               mz_stringW:    YOL.Jef,
               mz_stringS:    YOL.Nu3,
               mz_stringPS:   YOL.eZr
            };
   public RIk: any = {"s": YOL.RcF, "a": YOL.rLK, "d": YOL.LC0};
   public Mhu: string = YOL.DIh;
   private ywY: string = "en";
   private uaA: number;
   public UCO = "الرحمن";
   public kEs: any = { children: [], tree: [] };
   public PiG: string = "";
   public sh5: number = 600;
   public TZE: number = 600;
   public Hbs: string[];
   public Gq0 = new FormControl();
   public UpQ: Observable<string[]>;
   public BFK: any;
   public sAN: MatTableDataSource<any> = new MatTableDataSource([]);
   public HJP: string[];

   @ViewChild('mzSortableBARSVG') AeC: ElementRef;
   @ViewChild(MatSort) i6q: MatSort;
   @ViewChild(MatPaginator) DUm: MatPaginator;

   constructor(
      private K8U: gMC, 
      private aKK: z7f,
      private BB1: gmx) {
      this.gQY();
      this.uaA = window.innerWidth;
   }

   ngOnInit() {
      this.P4s();
      this.sAN.sort = this.i6q;
      this.sAN.paginator = this.DUm;
      this.UpQ = this.Gq0.valueChanges
         .pipe(
            startWith(''),
            map(value => this.GaO(value))
         );
      this.K8U.pmq(this.Mhu);
      this.ywY = localStorage.getItem("lang") || this.ywY;
   }

   ngAfterContentInit() {
      this.KvA();
   }

   public P4s(){
      if(this.uaA > 403){
         if(this.uaA < 499) this.HJP = ["a", "d"];
         else if(this.uaA < 599) this.HJP = ["s", "a", "d"];
         else if(this.uaA < 669) this.HJP = ["s", "a", "d"];
         else this.HJP = ["s", "a", "d"];
      }else this.HJP = ["d"];
   }

   public gQY(): void {
      this.Hbs = this.BB1.DOJ("Pis", null);
      this.V7j(this.UCO);
   }

   public GaO(nTJ) {
      var FIq = "";

      if (nTJ && typeof (nTJ) === 'string' && nTJ.length)
         FIq = nTJ.trim();

      if (FIq) {
         this.UCO = FIq;
         this.V7j(FIq);

         return this.Hbs.filter(function (q7v) {
            return q7v.indexOf(FIq) !== -1 || !FIq;
         });
      }
   }

   public V7j(FIq) {
      var BFK = this.BB1.DOJ("Wed", FIq);

      if (BFK && BFK["children"] && BFK["children"].length) {
         this.kEs = BFK["children"][0];
      }else this.kEs = { children: [], tree: 0 };

      this.PiG = FIq;
      this.BFK = this.BB1.DOJ("gUI", FIq);
      this.sAN.data = this.BFK;
      if (this.kEs && this.AeC && this.AeC.nativeElement) {
         d3.select(this.AeC.nativeElement).selectAll("*").remove();
         this.KvA();
      }
   }

   public KvA() {
      var color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, this.kEs.children.length + 1))
      var format = d3.format(",d");
      var radius = this.sh5 / 6;
      var arc = d3.arc()
         .startAngle(d => d.x0)
         .endAngle(d => d.x1)
         .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
         .padRadius(radius * 1.5)
         .innerRadius(d => d.y0 * radius)
         .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));

      var root = d3.hierarchy(this.kEs)
         .sum(d => d.value)
         .sort((a, b) => b.value - a.value);

      d3.partition().size([2 * Math.PI, root.height + 1])(root);

      root.each(d => d.current = d);

      const svg = d3.select(this.AeC.nativeElement)
         .attr("preserveAspectRatio", "xMinYMin meet")
         .attr("viewBox", `0 0 ${this.sh5} ${this.TZE}`);

      const g = svg.append("g")
         .attr("transform", `translate(${this.sh5 / 2},${this.sh5 / 2})`);

      const path = g.append("g")
         .selectAll("path")
         .data(root.descendants().slice(1))
         .join("path")
         .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
         .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
         .attr("d", d => arc(d.current));

      path.filter(d => d.children)
         .style("cursor", "pointer")
         .on("click", clicked);

      path.append("title")
         .text(d => `${getMoreDetails(d, this.GID, this.ywY)}`);

      const label = g.append("g")
         .attr("pointer-events", "none")
         .attr("text-anchor", "middle")
         .style("user-select", "none")
         .selectAll("text")
         .data(root.descendants().slice(1))
         .join("text")
         .attr("dy", "0.35em")
         .attr("fill-opacity", d => +labelVisible(d.current))
         .attr("transform", d => labelTransform(d.current))
         .text(d => d.data.name);

      const parent = g.append("circle")
         .datum(root)
         .attr("r", radius)
         .attr("fill", "none")
         .attr("pointer-events", "all")
         .on("click", clicked);

      var me = this;
      function arcVisible(d) {
         return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
      }

      function labelVisible(d) {
         return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
      }

      function labelTransform(d) {
         const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
         const y = (d.y0 + d.y1) / 2 * radius;
         return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      }
      var me = this;
      function clicked(p) {
         parent.datum(p.parent || root);

         root.each(d => d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
         });

         const t = g.transition().duration(750);

         me.i5M(p.data.name, p.depth);
         
         path.transition(t)
            .tween("data", d => {
               const i = d3.interpolate(d.current, d.target);
               return t => d.current = i(t);
            })
            .filter(function (d) {
               return +this.getAttribute("fill-opacity") || arcVisible(d.target);
            })
            .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attrTween("d", d => () => arc(d.current));

         label.filter(function (d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
         }).transition(t)
            .attr("fill-opacity", d => +labelVisible(d.target))
            .attrTween("transform", d => () => labelTransform(d.current));
      }
      
      function getMoreDetails(d, ob, l) {
         var ltltp = {ar: "كلمة", en: "word/s", fr: "mot/s", it: "Parola/e"};         
         return "" + (d.value || 0 ) + " " + ltltp[l];
      }
   }

   public i5M(Vx0, PVG) {
      if (this.sAN.paginator) {
         this.sAN.paginator.firstPage();
      }

      if (PVG) {
         var key_t = (PVG == 1) ? "j" : "h";
         var FIq = Vx0.split(" ")[1];
         this.sAN.data = this.BFK.filter(function (q7v) {
            return q7v[key_t] == FIq;
         });
      } else {
         this.sAN.data = this.BFK;
      }
   }

   public bOw(OwE){
      return this.aKK.ydS("hJw", OwE["a"]);
   }
}
