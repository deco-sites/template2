// deno-lint-ignore no-explicit-any
export default function Logger({ info, message }: any) {
  console.log(`@logger:: ${message}:`, info);

  return <div />;
}
