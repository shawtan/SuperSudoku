import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;

/**
 * Represents a solved sudoku board
 * @author shaw
 *
 */
public class Board {
	//TODO: Make square cells and strange cells consistent
	private int cell;

	private int length;

	private int[][] grid;
	private int[][] regions;


	public static void main(String[] args){

		Board b = new Board(5);

		//				System.out.println(b.checkGrid(new int[][]{{3,4,4,1},
		//						{2,1,2,3},
		//						{2,4,1,3},
		//						{1,3,4,2}}
		//						, true));


	}

	/**
	 * Constructor
	 * @param size The length of a cell
	 */
	public Board(int size){
		//		this.cell = size;
		//		this.length = cell * cell;

		this.length = size;
		this.cell = (int)Math.sqrt(length);
		if (cell*cell != length){
			//Not a perfect square
			cell = -length;
		}

		grid = new int[length][length];
		regions = makeStrangeRegions();
		generateBoard();

		System.out.println(this);

		//		System.out.println(checkGrid(grid,true));
	}

	public int[][] getGrid(){
		return grid;
	}


	public void generateBoard(){
		if (!fillGrid(grid, 0,0)){
			System.out.println("No valid board can be made");
		}

		//		convertBoard();

	}

	/**
	 * Tries to fill a grid in a way that follows the rules of sudoku
	 * @param grid
	 * @param r
	 * @param c
	 * @return Whether the attempt was successful
	 */
	private boolean fillGrid(int[][] grid, int r, int c){

		//		System.out.println("r: " + r + " c: " + c);

		if (!checkGrid(grid, false)){
			return false;
		}

		if (c >= length){
			c = 0;
			r++;
		}

		if (r >= length){
			if ( checkGrid(grid, true)){
				this.grid = grid;
				return true;
			} else {
				return false;
			}
		}

		LinkedList<Integer> numbers = new LinkedList<Integer>();
		for (int i = 1; i <= length; i++) {
			numbers.add(i);
		}

		//A random order of numbers allows different boards to be made
		Collections.shuffle(numbers);

		int[][] newGrid = cloneArray(grid);

		while(!numbers.isEmpty()){

			int n = numbers.remove();

			newGrid[r][c] = (char)n;

			if (fillGrid(newGrid,r,c+1)){
				return true;
			}


		}
		return false;
	}

	private boolean checkGrid(int[][] grid, boolean complete){

		if (complete){
			//Check for 0's
			for (int i = 0; i < grid.length; i++) {
				for (int j = 0; j < grid.length; j++) {
					if (grid[i][j] == 0)
						return false;
				}
			}
		}

		//Check rows and columns
		for (int i = 0; i < grid.length; i++) {

			if (!checkRegion(grid, i,0,1, length)){
				return false;
			}
			if (!checkRegion(grid, 0,i,length, 1)){
				return false;
			}

		}

		//Check cells
		if (cell > 0){
			if (!checkSquareRegion(grid)){
				return false;
			}
		} else {
			if (!checkStrangeRegion(grid)){
				return false;
			}
		}

		//		if (!checkStrangeRegion(grid)){
		//			return false;
		//		}
		//Check diagonals, maybe? NVM no valid solution


		return true;

	}

	private boolean checkSquareRegion(int[][] grid){

		for (int i = 0; i < cell; i++) {
			for (int j = 0; j < cell; j++) {				
				if (!checkRegion(grid, i*cell,j*cell,cell, cell)){
					return false;
				}
			}
		}
		return true;
	}

	private int[][] makeStrangeRegions(){

		if (length <=4){
			System.out.println("Length invalid");
			return null;
		}

		int[][] grid = new int[length][length];

		fillStrangeCorners(grid);

		int section = 5;		//'0' is a valid section
		int direction = 0; //up, down, left, right
		while (section < length){
			int count = 0;
			fillStrangeSpaces(grid, section, direction);
			section++;
			direction++;
		}
		return grid;
	}

	private int[][] fillStrangeCorners(int[][] grid){
		int count = 0;
		for (int sum = 0; sum < length; sum++) {
			for (int a = 0; a <= sum; a++) {

				grid[0 + (sum-a)][0 + a] = 1;
				grid[0 + a][length-1 - (sum-a)] = 2;
				grid[length-1 - (sum-a)][length-1 - a] = 3;
				grid[length-1 - a][0 + (sum-a)] = 4;
				count++;
				if (count >= length){
					return grid;
				}
			}
		}

		return grid;
	}

	private int[][] fillStrangeSpaces(int[][] grid, int section, int direction){

		direction = direction % 4;

		int count = 0;
		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid.length; j++) {
				int a,b;
				a=b=0;
				switch (direction){
				case 0:
					a = i; b = j; break;
				case 1:
					a = length-1-i; b = length-1-j; break;
				case 2:
					a = j; b = i; break;
				case 3:
					a = length-1-j; b = length-1-i; break;
				default:
					System.out.println("Direction error");
				}

				if (grid[a][b] == 0){
					grid[a][b] = section;
					count++;
					if (count >= length){
						return grid;
					}
				}
			}		
		}
		return grid;
	}


	private boolean checkStrangeRegion(int[][] grid){

		//		int[][] regions = makeStrangeRegions();

		HashSet<Integer>[] digits = (HashSet<Integer>[])new HashSet[length];
		for (int i = 0; i < digits.length; i++) {
			digits[i] = new HashSet<Integer>();
		}

		for (int i = 0; i < length; i++) {
			for (int j = 0; j < length; j++) {

				if (regions[i][j] != 0){

					int n = grid[i][j];

					if (n > 0){
						if (!digits[regions[i][j]].add(n)){
							return false;
						}
					}
				}

			}
		}

		return true;


	}

	private boolean checkRegion(int[][] grid, int x, int y, int dx, int dy){

		HashSet<Integer> digits = new HashSet<Integer>(length);

		for (int a = 0; a < dx; a++) {
			for (int b = 0; b < dy; b++) {				
				int n = grid[x + a][y + b];

				if (n > 0){
					if (! digits.add(n)){
						return false;
					} else if (n > length){
						return false;
					}
				}
			}
		}

		return true;
	}

	private char[][] toChar(int[][] grid){

		char[][] arr = new char[length][length];

		int change;
		if (length < 10){
			change = '0';
		} else {
			change = 'A';
		}

		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[0].length; j++) {
				arr[i][j] = (char) (grid[i][j] + change);
			}
		}

		return arr;
	}

	private int[][] cloneArray(int[][] arr){

		int[][] newArr = new int[length][length];

		for (int i = 0; i < newArr.length; i++) {
			newArr[i] = arr[i].clone();
		}

		return newArr;

	}

	public String toString(){
		return (toString(grid));
	}

	public String toString(int[][] arr){

		char[][] grid = toChar(arr);

		String s = "";

		int stringLength = 0;

		for (int i = 0; i < grid.length; i++) {
			for (int j = 0; j < grid[0].length; j++) {

				if (j % cell == 0){
					s += "| ";
				}
				s += grid[i][j] + " ";

			}
			s += "| ";
			s += "\n";
			if (i==0){
				stringLength = s.length()-2;}

			if ((i+1) % cell == 0){
				for (int j = 0; j < stringLength; j++) {
					s += "-";
				}
				s += "\n";
			}

		}

		//Make a border at the top
		s = "\n" + s;
		for (int j = 0; j < stringLength; j++) {
			s = "-" + s;
		}
		s += "\n";

		return s;

	}

}
