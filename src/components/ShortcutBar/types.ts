export type Props = {
    windowControls: windowControls,
};

type windowControls = {
    openFilterWindow: () => void;
    openSearchByCategoryWindow : () => void;
    goToSearchFilter : () => void;
}