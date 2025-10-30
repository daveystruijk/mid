type Middleware<Input, Output> = (context: Input) => Promise<Output>;

type Pipeline<CtxIn, CtxOut> = {
  use: <NextCtx>(mw: Middleware<CtxOut, NextCtx>) => Pipeline<CtxIn, NextCtx>;
  run: (ctx: CtxIn) => Promise<CtxOut>;
};

export function createPipeline<CtxIn, CtxOut>(fn: Middleware<CtxIn, CtxOut>): Pipeline<CtxIn, CtxOut> {
  return {
    use<NextCtx>(mw: Middleware<CtxOut, NextCtx>): Pipeline<CtxIn, NextCtx> {
      const composed: Middleware<CtxIn, NextCtx> = async (ctx) => {
        const nextCtx = await fn(ctx);
        return mw(nextCtx);
      };
      return createPipeline(composed);
    },
    run(ctx: CtxIn) {
      return fn(ctx);
    },
  };
}

// export const mid = <TInput, TOutput>(input: TInput): TOutput => {
//   return {
//     use<TOutput>(middleware: Middleware<TInput, TOutput>) {
//       const composed = async () => {
//         return middleware(input);
//       };
//       return mid(composed);
//     },
//   };
// };

export const mid = <Input>(input: Input) => {
  return {
    use<Output>(middleware: Middleware<Input, Output>) {
      const result = middleware(input);
      return mid(result);
    },
    async run() {
      return input;
    },
  };
};
