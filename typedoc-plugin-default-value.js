import { Converter, TypeScript } from 'typedoc';

export function load({ application }) {
  /** @type {Map<Reflection, string>} */
  const defaultValues = new Map();

  const printer = TypeScript.createPrinter();

  application.converter.on(
    Converter.EVENT_CREATE_DECLARATION,
    saveDefaultValues
  );
  application.converter.on(Converter.EVENT_CREATE_PARAMETER, saveDefaultValues);

  function saveDefaultValues(_context, reflection) {
    const node =
      reflection.project.getSymbolFromReflection(reflection)?.declarations?.[0];
    if (!node || !node.initializer) return;

    if (
      node.initializer.kind === TypeScript.SyntaxKind.ObjectLiteralExpression
    ) {
      // Unfortunately can't just set defaultValue right here, this happens before TD sets it.
      defaultValues.set(
        reflection,
        printer.printNode(
          TypeScript.EmitHint.Expression,
          node.initializer,
          node.getSourceFile()
        )
      );
    }
  }

  application.converter.on(Converter.EVENT_RESOLVE_BEGIN, () => {
    for (const [refl, init] of defaultValues) {
      refl.defaultValue = init;
    }
    defaultValues.clear();
  });
}
