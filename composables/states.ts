import { watchPausable } from "@vueuse/core";

export const useTheatre = () =>
  useState<string | null>("useTheatre", () => null);

export type UseURLStateOptions<T> = {
  id: string;
  initial: T;
  key?: string;
};

export function useURLState<T>(opts: UseURLStateOptions<T>) {
  const route = useRoute();
  const router = useRouter();
  const state = useState<T>(opts.id, () => opts.initial);
  const value = route.query[opts.key || opts.id];

  console.log(value);

  const { pause, resume } = watchPausable(state, (value) => {
    console.log("value", value);

    router.replace({
      query: {
        [opts.key || opts.id]: JSON.stringify(value),
      },
    });
  });

  if (value) {
    pause();

    state.value = JSON.parse(value as string) as T;
  }

  resume();
  return state;
}
